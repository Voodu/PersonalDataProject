import { ImageSourcePropType } from 'react-native';

interface Images {
  favicon: ImageSourcePropType;
}

const images: Images = {
  favicon: require('./favicon.png'),
};

export default images;
