import React from "react";
import ReactApexChart from 'react-apexcharts';
import moment from "moment"
class Charts extends React.Component {
    constructor(props) {
        super(props);

        // Common options for both line and donut charts
        const commonOptions = {
            chart: {
                // height: 350,

                toolbar: {
                    show: false
                }
            },

            colors: ['#0038ff', '#4a72ff', '#809cff', '#dde4ff'],

            stroke: {
                curve: 'smooth'
            },
            title: {
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            },

        };

        this.state = {
            series: this.props.data,
            options: {
                // Spread the common options
                ...commonOptions,
                // Additional options specific to the chart type
                ...(this.props.type === 'line'
                    ? {

                        chart: {
                            id: 'medical_chart',
                            toolbar: {
                                show: false
                            },
                        },
                        stroke: {
                            curve: 'straight',
                            width: [4, 2],

                            dashArray: [0, 8],
                        },
                        title: {
                            text: props.title,
                            align: 'center',
                            style: {
                                color: "#999",

                            }
                        },
                        tooltip: {
                            x: {
                                formatter: function (val, timestamp) {
                                    if (val) {
                                        console.log('val', val)
                                        return moment(val, 'DD-MM-YYYY').format('DD-MMM-YYYY');;
                                    }
                                }
                            }
                        },
                        xaxis: {
                            lines: {
                                show: true
                            },
                            labels: {
                                style: {
                                    colors: '#999',
                                },
                                show: true,
                                step: 2,
                                tickAmount: 5,
                                formatter: function (value, timestamp, index) {
                                    if (value) {
                                        return moment(value, 'DD-MM-YYYY').format('DD');
                                    }
                                },
                            },
                            categories: props.categories === undefined ? [] : props.categories
                        },
                        yaxis: {

                            lines: {
                                show: true
                            },
                            // opposite: true,
                            // forceNiceScale:true,
                            labels: {
                                style: {
                                    colors: '#999'
                                },
                                formatter: function (val) {
                                    val = Math.abs(val).toFixed()
                                    return (new Intl.NumberFormat("en-US")).format(val);
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                style: {
                                    colors: props.colors === undefined ? ["#00e396", "#ff3154", "#fadd17"] : props.colors,
                                },
                                formatter: function (val) {
                                    if (val) {
                                        return moment(val, 'DD-MM-YYYY').format('DD-MMM-YYYY');
                                    }
                                }

                            },

                            title: {
                                text: props.y_axis_tittle === undefined ? undefined : props.y_axis_tittle,
                                style: {
                                    color: '#939394',
                                },
                            },
                        },
                        grid: {
                            show: true,
                            strokeDashArray: 0,

                        },
                    }
                    : this.props.type === 'donut'
                        ? {
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '70%',
                                        labels: {
                                            show: true,
                                            total: {
                                              showAlways: true,
                                              show: true
                                            }
                                          }
                                    },
                                },
                            },
                            dataLabels: {
                                enabled: false
                            },
                            labels: ["Net Revenue ", "Commission", "Referral", "Loyalty"], // Example series labels

                            legend: {
                                show: true,
                                position: 'right',
                                offsetY: 80,
                                height: 230,
                                
                                fontSize: "16px", // Adjust the font size as needed

                            }, annotations: {
                                points: [
                                    {
                                        x: "50%",
                                        y: "50%",
                                        yAxisIndex: 0,
                                        label: {

                                            style: {
                                                fontSize: "20px",
                                            },
                                        },
                                    },
                                ],
                            },

                        }
                        :
                        this.props.type === 'bar'
                            ? {
                                
                                chart: {
                                    toolbar: {
                                        show: false,
                                    },
                                    type: 'bar',
                                    height: 350,
                                   
                                },
                                plotOptions: {
                                    bar: {
                                        borderRadius: 4,
                                        horizontal: false,
                                    }
                                },
                                dataLabels: {
                                    enabled: false
                                },
                                xaxis: {
                                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                                        'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                    ],
                                }

                            }
                            : {}),
            },
        };
    }

    render() {
        return (
            <div id="chart" style={{marginTop:`${this.props.is_edit?"61px":""}`}}>
                <ReactApexChart options={this.state.options} series={this.state.series} type={this.props.type} height={350} />
            </div>
        );
    }
}

export default Charts;
