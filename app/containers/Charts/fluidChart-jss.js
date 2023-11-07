const styles = {
  chartFluid: {
    width: '100%',
    minWidth: 500,
    height: 450,
    '&.customChart': {
      minWidth: 300,
    },
    '@media (max-width: 1380px)': {
      '&.customChart .recharts-surface': {
        maxWidth: '72% !important',
        overflow: 'visible'
      }
    },
    '@media (min-width: 1400px) and (max-width: 1450px)': {
      '&.customChart .recharts-surface': {
        maxWidth: '82% !important',
        overflow: 'visible'
      }
    }
  }
};

export default styles;
