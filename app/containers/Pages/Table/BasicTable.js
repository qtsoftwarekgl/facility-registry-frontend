import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { PapperBlock, EmptyData } from 'enl-components';
import EnhancedTable from './EnhancedTable';

const headCells = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Name'
  },
  {
    id: 'age', numeric: false, disablePadding: true, label: 'Age'
  },
  {
    id: 'gender', numeric: false, disablePadding: true, label: 'Gender'
  },
  {
    id: 'phone', numeric: false, disablePadding: true, label: 'Phone'
  },
  {
    id: 'email', numeric: false, disablePadding: true, label: 'Email'
  },
];

const rows = [
  {
    _id: 1, name: 'Bob', age: 32, gender: 'Male', phone: '9988776655', email: 'bob@gmail.com'
  },
  {
    _id: 2, name: 'Ray', age: 31, gender: 'Male', phone: '9988776655', email: 'ray@gmail.com'
  },
  {
    _id: 3, name: 'Tina', age: 25, gender: 'Female', phone: '9988776655', email: 'tina@gmail.com'
  },
  {
    _id: 4, name: 'Lisa', age: 22, gender: 'Female', phone: '9988776655', email: 'lisa@gmail.com'
  },
  {
    _id: 5, name: 'Dany', age: 26, gender: 'Male', phone: '9988776655', email: 'dany@gmail.com'
  },
  {
    _id: 6, name: 'Pia', age: 24, gender: 'Female', phone: '9988776655', email: 'pia@gmail.com'
  },
  {
    _id: 7, name: 'Wayne', age: 29, gender: 'Male', phone: '9988776655', email: 'wayne@gmail.com'
  },
  {
    _id: 8, name: 'Randy', age: 32, gender: 'Male', phone: '9988776655', email: 'randy@gmail.com'
  },
  {
    _id: 9, name: 'Moni', age: 24, gender: 'Female', phone: '9988776655', email: 'moni@gmail.com'
  },
  {
    _id: 10, name: 'Diya', age: 30, gender: 'Female', phone: '9988776655', email: 'diya@gmail.com'
  },
  {
    _id: 11, name: 'Eminem', age: 32, gender: 'Male', phone: '9988776655', email: 'eminem@gmail.com'
  },
  {
    _id: 12, name: 'Bob', age: 32, gender: 'Male', phone: '9988776655', email: 'bob@gmail.com'
  },
  {
    _id: 13, name: 'Ray', age: 31, gender: 'Male', phone: '9988776655', email: 'ray@gmail.com'
  },
  {
    _id: 14, name: 'Tina', age: 25, gender: 'Female', phone: '9988776655', email: 'tina@gmail.com'
  },
  {
    _id: 15, name: 'Lisa', age: 22, gender: 'Female', phone: '9988776655', email: 'lisa@gmail.com'
  },
  {
    _id: 16, name: 'Dany', age: 26, gender: 'Male', phone: '9988776655', email: 'dany@gmail.com'
  },
  {
    _id: 17, name: 'Pia', age: 24, gender: 'Female', phone: '9988776655', email: 'pia@gmail.com'
  },
  {
    _id: 18, name: 'Wayne', age: 29, gender: 'Male', phone: '9988776655', email: 'wayne@gmail.com'
  },
  {
    _id: 19, name: 'Randy', age: 32, gender: 'Male', phone: '9988776655', email: 'randy@gmail.com'
  },
  {
    _id: 20, name: 'Moni', age: 24, gender: 'Female', phone: '9988776655', email: 'moni@gmail.com'
  }
];


class BasicTable extends Component {
  render() {
    const title = brand.name;
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Table" whiteBg icon="table_chart" desc="UI Table when no data to be shown">
          <div>
            <EnhancedTable
              tableTitle="Users"
              headCells={headCells}
              rows={rows}
              totalData={120}
              onPageChange={(page) => {
                console.log('page##', page);
              }}
            />
          </div>
        </PapperBlock>
        <PapperBlock title="Empty Table" whiteBg icon="table_chart" desc="They (allegedly) aid usability in reading tabular data by offering the user a coloured means of separating and differentiating rows from one another">
          <div>
            <EmptyData />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default BasicTable;
