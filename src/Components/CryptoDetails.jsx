import React, { useState, useEffect, useRef } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import LineChart from "./LineChart";
import Loader from "./Loader";
import { useGetCryptohistoryQuery } from "../services/cryptohistoryApi";
import { InfinitySpin } from "react-loader-spinner";
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;

  const [currency, setCurrency] = useState("usd");
  const [days, setDays] = useState(1);

  const { currentData } = useGetCryptohistoryQuery({
    coinName: cryptoDetails?.name.toLowerCase(),
    currency,
    days,
  });

  const ref = useRef();

  if (isFetching) return <Loader />;

  // console.log("history", currentData?.prices);
  // console.log('data',data);
  // console.log('cd',cryptoDetails);
  // console.log('ch',coinHistory)

  const time = ["1d", "3d", "7d", "1m", "3m", "1y", "3y", "5y"];

  const currencies = ["USD", "EUR", "JPY", "INR"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>
          {data?.data?.coin.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Col>
      {currentData?.prices ? (
        <div>
          <div className="select-options">
            <Select
              defaultValue={
                days == 30
                  ? "1m"
                  : days == 90
                  ? "3m"
                  : days == 365
                  ? "1y"
                  : days == 3 * 365
                  ? "3y"
                  : days == 5 * 365
                  ? "5y"
                  : `${days}d`
              }
              className="select-timeperiod"
              placeholder="Select Time Period"
              onChange={(value) => {
                switch (value) {
                  case "1d":
                    setDays(1);
                    break;
                  case "3d":
                    setDays(3);
                    break;
                  case "7d":
                    setDays(7);
                    break;
                  case "1m":
                    setDays(30);
                    break;
                  case "3m":
                    setDays(90);
                    break;
                  case "1y":
                    setDays(365);
                    break;
                  case "3y":
                    setDays(3 * 365);
                    break;
                  case "5y":
                    setDays(5 * 365);
                    break;
                }
              }}
            >
              {time.map((date) => (
                <Option key={date}>{date}</Option>
              ))}
            </Select>
            <Select
              defaultValue={currency.toUpperCase()}
              className="select-currency"
              placeholder="Select Time Period"
              onChange={(value) => {
                switch (value) {
                  case "USD":
                    setCurrency("usd");
                    break;
                  case "EUR":
                    setCurrency("eur");
                    break;
                  case "JPY":
                    setCurrency("jpy");
                    break;
                  case "INR":
                    setCurrency("inr");
                    break;
                }
              }}
            >
              {currencies.map((crncy) => (
                <Option key={crncy}>{crncy}</Option>
              ))}
            </Select>
          </div>
          <LineChart
            coinHistory={currentData?.prices}
            ref={ref}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
            currency={currency}
            days={days}
          />
        </div>
      ) : (
        <InfinitySpin width="200" color="#00cc88" />
      )}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title className="coin-details-heading" level={3}>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An Overview showing the stats of {cryptoDetails.name} such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title className="coin-details-heading" level={3}>
              Other Statistics
            </Title>
            <p>An Overview showing the stats of All Cryptocurrencies.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name} ?
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
