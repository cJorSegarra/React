import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
import "./barchart-component.scss";

interface BarChartProps {
    data: { name: string; posts: number; comments: number }[];
}

const BarChart = ({ data }: BarChartProps) => {
    const { t } = useTranslation();

    const options = {
        chart: {
            type: "column",
        },
        title: {
            text: t("quantity_of_posts_and_comments_per_user"),
        },
        xAxis: {
            categories: data.map((item) => item.name),
        },
        yAxis: {
            min: 0,
            title: {
                text: t("quantity"),
            },
        },
        series: [
            {
                name: t("posts"),
                data: data.map((item) => item.posts),
            },
            {
                name: t("comments"),
                data: data.map((item) => item.comments),
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BarChart;
