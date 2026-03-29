"""
Геопортал «Утриш» — API для слоёв и экологических данных.
GET  /         — проверка работы
GET  /layers   — список слоёв
POST /layers   — добавить слой
DELETE /layers?id=1 — удалить слой
GET  /eco      — экологические данные (фильтр: ?year=2023&zone=12-А)
POST /eco      — добавить запись
PUT  /eco      — обновить запись
DELETE /eco?id=1 — удалить запись
"""

import json
import os
import psycopg2

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}

def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def ok(data):
    return {"statusCode": 200, "headers": CORS, "body": json.dumps(data, ensure_ascii=False)}

def err(msg, code=400):
    return {"statusCode": code, "headers": CORS, "body": json.dumps({"error": msg}, ensure_ascii=False)}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/").rstrip("/") or "/"
    params = event.get("queryStringParameters") or {}
    body = {}
    if event.get("body"):
        try:
            body = json.loads(event["body"])
        except Exception:
            pass

    db = get_db()
    cur = db.cursor()

    try:
        # ── Проверка работы ──────────────────────────────────────────
        if path == "/" or path == "":
            return ok({"status": "ok", "service": "Утриш ГИС API"})

        # ── СЛОИ ─────────────────────────────────────────────────────
        if path == "/layers":
            schema = os.environ.get("MAIN_DB_SCHEMA", "public")

            if method == "GET":
                cur.execute(f"SELECT id, name, color, visible, opacity, geojson FROM {schema}.layers ORDER BY id")
                rows = cur.fetchall()
                layers = [
                    {"id": r[0], "name": r[1], "color": r[2], "visible": r[3], "opacity": r[4], "geojson": json.loads(r[5])}
                    for r in rows
                ]
                return ok({"layers": layers})

            if method == "POST":
                name = body.get("name", "Новый слой")
                color = body.get("color", "#e74c3c")
                opacity = float(body.get("opacity", 0.7))
                geojson = json.dumps(body.get("geojson", {}))
                cur.execute(
                    f"INSERT INTO {schema}.layers (name, color, opacity, geojson) VALUES (%s,%s,%s,%s) RETURNING id",
                    (name, color, opacity, geojson)
                )
                new_id = cur.fetchone()[0]
                db.commit()
                return ok({"id": new_id, "message": "Слой добавлен"})

            if method == "DELETE":
                layer_id = params.get("id")
                if not layer_id:
                    return err("Укажите id слоя")
                cur.execute(f"DELETE FROM {schema}.layers WHERE id = %s", (int(layer_id),))
                db.commit()
                return ok({"message": "Слой удалён"})

        # ── ЭКОЛОГИЧЕСКИЕ ДАННЫЕ ──────────────────────────────────────
        if path == "/eco":
            schema = os.environ.get("MAIN_DB_SCHEMA", "public")

            if method == "GET":
                where = []
                args = []
                if params.get("year"):
                    where.append("year = %s")
                    args.append(int(params["year"]))
                if params.get("zone"):
                    where.append("zone = %s")
                    args.append(params["zone"])
                sql = f"SELECT id, name, value, year, zone, description FROM {schema}.eco_data"
                if where:
                    sql += " WHERE " + " AND ".join(where)
                sql += " ORDER BY year, zone"
                cur.execute(sql, args)
                rows = cur.fetchall()
                records = [
                    {"id": r[0], "name": r[1], "value": r[2], "year": r[3], "zone": r[4], "description": r[5]}
                    for r in rows
                ]
                return ok({"records": records, "total": len(records)})

            if method == "POST":
                cur.execute(
                    f"INSERT INTO {schema}.eco_data (name, value, year, zone, description) VALUES (%s,%s,%s,%s,%s) RETURNING id",
                    (body.get("name", ""), float(body.get("value", 0)), int(body.get("year", 2024)),
                     body.get("zone", ""), body.get("description", ""))
                )
                new_id = cur.fetchone()[0]
                db.commit()
                return ok({"id": new_id, "message": "Запись добавлена"})

            if method == "PUT":
                rid = body.get("id")
                if not rid:
                    return err("Укажите id записи")
                cur.execute(
                    f"UPDATE {schema}.eco_data SET name=%s, value=%s, year=%s, zone=%s, description=%s WHERE id=%s",
                    (body.get("name"), float(body.get("value", 0)), int(body.get("year", 2024)),
                     body.get("zone", ""), body.get("description", ""), int(rid))
                )
                db.commit()
                return ok({"message": "Запись обновлена"})

            if method == "DELETE":
                rid = params.get("id")
                if not rid:
                    return err("Укажите id записи")
                cur.execute(f"DELETE FROM {schema}.eco_data WHERE id = %s", (int(rid),))
                db.commit()
                return ok({"message": "Запись удалена"})

        return err("Маршрут не найден", 404)

    finally:
        cur.close()
        db.close()
