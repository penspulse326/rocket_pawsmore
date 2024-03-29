import { SpeciesType } from '@/common/constants/types/enums';

const speciesData = {
  [SpeciesType.狗]: {
    name: '狗',
    src: '/images/exp-dog.png',
  },
  [SpeciesType.貓]: {
    name: '貓',
    src: '/images/exp-cat.png',
  },
  [SpeciesType.倉鼠]: {
    name: '倉鼠',
    src: '/images/exp-rice.png',
  },
  [SpeciesType.其他]: {
    name: '其他',
    src: '/images/exp-more-lg.jpg',
  },
};

export { speciesData };
