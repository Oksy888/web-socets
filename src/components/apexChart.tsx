import Chart from 'react-apexcharts'
import numeral from 'numeral'

import styled from 'styled-components'
import { DatePickerState } from './DatePicker'
import { ReactNode } from 'react'

type DataItem = {
  name?: string
  type?: string
  color?: string
  isMainData?: boolean
  yAxisTitle?: string
  data: {
    x: any
    y: any
  }[]
}
export type StoreItem = {
  properties: Props
  updateProperties: (properties: Props) => void
  setDateRangeValue: (value: Date[] | null | undefined) => void
}

export type Props = {
  type?:
    | 'line'
    | 'area'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
  title?: ReactNode
  series?: DataItem[]
  options?: ApexCharts.ApexOptions

  dateRange?: DatePickerState
  onDateRangeChange?: (value: {
    value: Date[] | undefined | null
    api: { getState: () => StoreItem }
  }) => void
}

const ApexChart = ({ states, videoRised }) => {
  function NumberFormatter(number) {
    const formattedNumber = numeral(number).format('0a').toUpperCase()
    return formattedNumber
  }
  const subscribers = states.map((state) => state.subscribers)
  const clips = states.map((state) => state.clips)
  const likes = states.map((state) => state.likes)
  const date = states.map((state) => state.parseDate)
  const formattedDates = date.map((d) => new Date(d).getTime())
  console.log(videoRised[0])
  const { playCount, parseDate: videoDate, coverUrl } = videoRised[0]
  const options = {
    chart: {
      id: 'basic-bar',
      background: '#000000',
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
    },
    xaxis: {
      title: {
        text: 'Date',
      },
      type: 'datetime',
      categories: date,
      tickAmount: 6,
      labels: {
        style: {
          colors: '#999',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: 'Active users',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
          color: '#263238',
        },
      },
      labels: {
        style: {
          colors: '#999',
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    colors: ['#c2fc46', 'rgba(0, 135, 233, 1)', 'rgba(199, 4, 254, 1)'],
    grid: {
      show: false,
      lines: {
        show: false,
      },
    },
    stroke: {
      width: [3, 3, 3],
      curve: 'smooth',
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'right',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Helvetica, Arial',
      fontWeight: 400,
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: undefined,
        useSeriesColors: true,
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 10,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
    annotations: {
      xaxis: [
        {
          x: new Date(videoDate).getTime(),
          strokeDashArray: 0,
          borderColor: '#fff',
          label: {
            click: function (event, annotation, index) {
              // Your onClick function here
              console.log('Clicked')
            },
            borderColor: '#999',
            style: {
              color: '#fff',
              background: '#ffffff2b',
              cursor: 'pointer',
              cssClass: 'apexcharts-xaxis-annotation-label',
            },
            text: `${NumberFormatter(playCount)} views`,
          },
        },
      ],
      points: [
        /* {
              x: new Date('2024-04-13T08:28:38').getTime(),
              y: 1400000,
              marker: {
                size: 8,
                fillColor: '#fff',
                strokeColor: 'red',
                radius: 2,
                cssClass: 'apexcharts-label-video',
              },
              label: {
                borderColor: '#FF4560',
                offsetY: 0,
                style: {
                  color: '#fff',
                  background: '#FF4560',
                  cursor: 'pointer',
                },

                text: '7300000 views',
              },
            },*/
        {
          x: new Date(videoDate).getTime(),
          y: 1400000,
          marker: {
            size: 0,
          },
          image: {
            path: coverUrl,
            width: 70,
            height: 100,
            style: {
              cssClass: 'image-with-border',
            },
          },
        },
        /*{
              x: new Date('2024-04-15T08:28:38').getTime(),
              y: 1400000,
              marker: {
                size: 0,
              },
              image: {
                path: 'https://p16-sign-va.tiktokcdn.com/obj/tos-maliva-p-0068/69717769131545338d20e624b3f053bd_1712868135?lk3s=d05b14bd&nonce=54781&refresh_token=f269deaddec763dda128b6f40b5683be&x-expires=1713376800&x-signature=RejGivd4M6xZOoDH2%2BlqMgTZDsY%3D&s=AWEME_DETAIL&se=false&sh=&sc=dynamic_cover&l=20240416183904E088862A0B37F82AF6BD',
                width: 70,
                height: 100,
                style: {
                  cssClass: 'image-with-border',
                },
              },
            },*/
      ],
    },
  }
  const series = [
    {
      name: 'followers',
      data: subscribers,
    },
    {
      name: 'videos',
      data: clips,
    },
    {
      name: 'likes',
      data: likes,
    },
  ]
  const updateData = () => {
    return null
  }
  const selection = 'one_year'
  return (
    <WrapChart>
      <Chart
        type="line"
        height={400}
        width={800}
        series={series}
        options={options}
      />
      <Toolbar>
        <StyledButton
          id="one_month"
          onClick={() => updateData('one_month')}
          className={selection === 'one_month' ? 'active' : ''}
        >
          1M
        </StyledButton>

        <StyledButton
          id="six_months"
          onClick={() => updateData('one_year')}
          className={selection === 'one_year' ? 'active' : ''}
        >
          1Y
        </StyledButton>

        <StyledButton
          id="all"
          onClick={() => updateData('all')}
          className={selection === 'all' ? 'active' : ''}
        >
          ALL
        </StyledButton>
      </Toolbar>
    </WrapChart>
  )
}

export default ApexChart

const StyledButton = styled.button`
  background: #fff;
  color: #222;
  border: 1px solid #e7e7e7;
  border-bottom: 2px solid #ddd;
  border-radius: 2px;
  padding: 4px 17px;
`

const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  bottom: 25px;
`
const WrapChart = styled.div`
  position: relative;
`
