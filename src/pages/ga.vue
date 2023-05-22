<template>
    <div>
    <h2>Most Impression Pages</h2>
    <!-- <ul>
      <li v-for="page in pages" :key="page.url">
        {{ page.title }}
      </li>
    </ul> -->
  </div>
</template>

<script>
// import { google } from 'googleapis';
// import moment from 'moment';
// import _ from 'lodash';

export default {
//   name: 'MostImpressionPages',
//   data() {
//     return {
//       pages: [],
//     };
//   },
//   async created() {
//     try {
//       const auth = new google.auth.JWT(
//         process.env.GA_CLIENT_EMAIL,
//         null,
//         process.env.GA_PRIVATE_KEY,
//         ['https://www.googleapis.com/auth/analytics.readonly']
//       );

//       const startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
//       const endDate = moment().format('YYYY-MM-DD');

//       const response = await google.analytics('v3').data.ga.get({
//         auth,
//         ids: `ga:${process.env.GA_VIEW_ID}`,
//         'start-date': startDate,
//         'end-date': endDate,
//         metrics: 'ga:impressions',
//         dimensions: 'ga:pagePath',
//         sort: '-ga:impressions',
//         'max-results': 10,
//       });

//       const pagePaths = response.data.rows.map(row => row[0]);

//       const { data } = await google.analytics('v3').management.profiles.list({
//         auth,
//         accountId: '~all',
//         webPropertyId: '~all',
//       });

//       const profile = _.find(data.items, { id: process.env.GA_VIEW_ID });
//       const siteUrl = profile.websiteUrl;

//       const pages = await Promise.all(
//         pagePaths.map(async pagePath => {
//           const url = `${siteUrl}${pagePath}`;

//           const { data } = await google.analytics('v3').metadata.columns.list({
//             auth,
//             reportType: 'ga',
//             quotaUser: this.$route.path,
//           });

//           const titleColumn = _.find(data.items, { id: 'ga:pageTitle' });

//           const response = await google.analytics('v3').data.ga.get({
//             auth,
//             ids: `ga:${process.env.GA_VIEW_ID}`,
//             'start-date': startDate,
//             'end-date': endDate,
//             metrics: 'ga:pageviews',
//             dimensions: 'ga:pagePath',
//             filters: `ga:pagePath==${pagePath}`,
//           });

//           const pageviews = response.data.rows[0][1];

//           return {
//             url,
//             title: titleColumn.attributes.uiName,
//             pageviews,
//           };
//         })
//       );

//       this.pages = pages;
//     } catch (err) {
//       console.error(err);
//     }
//   },
};
</script>
