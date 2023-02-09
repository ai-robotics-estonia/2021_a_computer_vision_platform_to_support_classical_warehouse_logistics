import useMediaQuery from './useMediaQuery';

export default function useBreakPoints() {
  return {
    isXs: useMediaQuery('(max-width: 575px)'),
    isSm: useMediaQuery('(min-width: 576px) and (max-width: 767px)'),
    isMd: useMediaQuery('(min-width: 768px) and (max-width: 991px)'),
    isLg: useMediaQuery('(min-width: 992px) and (max-width: 1199px)'),
    isXl: useMediaQuery('(min-width: 1200px) and (max-width: 1399px)'),
    isXxl: useMediaQuery('(min-width: 1400px)'),
    isSmallerThanMd: useMediaQuery('(max-width: 767px)'),
    isSmallerThanLg: useMediaQuery('(max-width: 991px)'),
    isSmallerThanXl: useMediaQuery('(max-width: 1199px)'),
  };
}
