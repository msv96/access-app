import React from 'react';
import ReportViewer from 'react-lighthouse-viewer';

export default function MainForm(props) {
  const { reports } = props;
  return <ReportViewer json={reports} />;
}
