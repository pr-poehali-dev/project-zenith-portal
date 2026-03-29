import type { GeoJSON } from "geojson";

export const SAMPLE_VEGETATION_LOSS: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        zone: "12-А",
        name: "Зона деградации 12-А",
        loss_ha: 4.2,
        year: 2023,
        type: "Деградация",
        description: "Умеренная потеря растительности вследствие засухи",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.08, 44.74],
          [37.12, 44.74],
          [37.13, 44.77],
          [37.09, 44.78],
          [37.07, 44.76],
          [37.08, 44.74],
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        zone: "8-Б",
        name: "Зона вырубки 8-Б",
        loss_ha: 7.1,
        year: 2022,
        type: "Вырубка",
        description: "Высокая степень потери древесного покрова",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.14, 44.75],
          [37.18, 44.74],
          [37.19, 44.78],
          [37.15, 44.79],
          [37.13, 44.77],
          [37.14, 44.75],
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        zone: "3-В",
        name: "Зона пожара 3-В",
        loss_ha: 2.1,
        year: 2023,
        type: "Пожар",
        description: "Незначительные потери после низового пожара",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.10, 44.78],
          [37.14, 44.78],
          [37.15, 44.80],
          [37.11, 44.81],
          [37.09, 44.80],
          [37.10, 44.78],
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        zone: "15-Г",
        name: "Зона засухи 15-Г",
        loss_ha: 9.4,
        year: 2021,
        type: "Засуха",
        description: "Критическая потеря растительности от засухи 2021 года",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.06, 44.77],
          [37.09, 44.77],
          [37.08, 44.80],
          [37.05, 44.80],
          [37.06, 44.77],
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        zone: "7-Д",
        name: "Зона восстановления 7-Д",
        loss_ha: 1.2,
        year: 2024,
        type: "Восстановление",
        description: "Слабая потеря — зона частичного восстановления",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.15, 44.79],
          [37.19, 44.78],
          [37.20, 44.81],
          [37.16, 44.82],
          [37.15, 44.79],
        ]],
      },
    },
  ],
};
