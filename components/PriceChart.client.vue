<script setup lang="ts">
import { use } from 'echarts/core'
import VChart from 'vue-echarts'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption, BarSeriesOption } from 'echarts/charts'

import type {
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  GridComponentOption,
} from 'echarts/components'
import { color } from 'echarts'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
])

type EChartsOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | BarSeriesOption
>

const theme = useColorMode()
// const chartOptions = computed<EChartsOption>(() => {
//   return {
//     title: {
//       text: 'Stacked Line',
//     },
//     tooltip: {
//       trigger: 'axis',
//     },
//     legend: {
//       data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
//     },
//     grid: {
//       left: '3%',
//       right: '4%',
//       bottom: '3%',
//       containLabel: true,
//     },
//     toolbox: {
//       feature: {
//         saveAsImage: {},
//       },
//     },
//     xAxis: {
//       type: 'category',
//       boundaryGap: true,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         name: 'Email',
//         type: 'line',
//         stack: 'Total',
//         data: [120, 132, 101, 134, 90, 230, 210],
//       },
//       {
//         name: 'Union Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [220, 182, 191, 234, 290, 330, 310],
//       },
//       {
//         name: 'Video Ads',
//         type: 'line',
//         stack: 'Total',
//         data: [150, 232, 201, 154, 190, 330, 410],
//       },
//       {
//         name: 'Direct',
//         type: 'line',
//         stack: 'Total',
//         data: [320, 332, 301, 334, 390, 330, 320],
//       },
//       {
//         name: 'Search Engine',
//         type: 'line',
//         stack: 'Total',
//         data: [820, 932, 901, 934, 1290, 1330, 1320],
//       },
//     ],
//   }
// })

const store = useTrainPrice()

const config = useRuntimeConfig()

// const chartOptions = computed(() => ({
//   title: {
//     text: 'Price',
//   },
//   tooltip: {
//     trigger: 'axis',
//   },
//   legend: {
//     data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
//   },
//   grid: {
//     left: '3%',
//     right: '3%',
//     bottom: '3%',
//     containLabel: true,
//   },
//   // toolbox: {
//   //   feature: {
//   //     saveAsImage: {},
//   //   },
//   // },
//   xAxis: {
//     type: 'time',
//     boundaryGap: true,
//   },
//   yAxis: {
//     type: 'value',
//   },
//   series: [
//     {
//       name: 'Email',
//       type: 'line',
//       stack: 'Total',
//       data: [120, 132, 101, 134, 90, 230, 210],
//     },
//     {
//       name: 'Union Ads',
//       type: 'line',
//       stack: 'Total',
//       data: [220, 182, 191, 234, 290, 330, 310],
//     },
//     {
//       name: 'Video Ads',
//       type: 'line',
//       stack: 'Total',
//       data: [150, 232, 201, 154, 190, 330, 410],
//     },
//     {
//       name: 'Direct',
//       type: 'line',
//       stack: 'Total',
//       data: [320, 332, 301, 334, 390, 330, 320],
//     },
//     {
//       name: 'Search Engine',
//       type: 'line',
//       stack: 'Total',
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//     },
//   ],
// }))

// console.log(store.getChartData.test1.chromium)
// console.log(store.getChartData.chromiumTest)

// const chromiumTest = store.trainData
//   .filter(v => v.browser === 'chromium')
//   .map(v => [v.timestamp, v.price])

// console.log(chromiumTest)

const chartOptions = computed<EChartsOption>(() => ({
  title: {
    text: 'Price',
  },
  tooltip: {
    trigger: 'axis',
    valueFormatter: v => `${(v as number) + config.public.basePrice}`,
  },
  backgroundColor: theme.value === 'dark' ? '#121212' : '#FFF',
  // legend: {
  //   data: ['chromium'],
  // },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '3%',
    containLabel: true,
  },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {},
  //   },
  // },

  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: v => `${v + config.public.basePrice}`,
    },
  },
  legend: {},
  series: [
    {
      name: 'Chromium',
      type: 'bar',
      data: store.getChartData.test1.chromium,
      itemStyle: {
        color: '#126ee0',
      },
    },
    {
      name: 'Firefox',
      type: 'bar',
      data: store.getChartData.test1.firefox,
      itemStyle: {
        color: '#ff6600',
      },
    },

    {
      name: 'Webkit',
      type: 'bar',
      data: store.getChartData.test1.webkit,
      itemStyle: {
        color: '#1fc600',
      },
    },
  ],
}))
</script>

<template>
  <div class="h-screen">
    <VChart :option="chartOptions" :theme="$colorMode.value" />
  </div>
</template>
