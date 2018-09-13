import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Chart = ({ data }) => {
  data = _.map(data, i => {
    i.date = moment(i.date).valueOf();
    return i;
  });
  const tickFormatter = tickItem => moment(tickItem).format('MMM Do YY');

  const calcAspectRatio = () => {
    if (window.innerWidth < 756) {
      return 16 / 8;
    } else {
      return 16 / 4;
    }
  };
  return (
    <ResponsiveContainer width="100%" aspect={calcAspectRatio()}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={tickFormatter}
          type="number"
          domain={[
            moment()
              .subtract(7, 'days')
              .startOf('day')
              .valueOf(),
            moment()
              .startOf('day')
              .valueOf()
          ]}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="views" barSize={20} fill="#8884d8" />>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
