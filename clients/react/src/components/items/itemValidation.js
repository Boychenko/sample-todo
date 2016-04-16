import {createValidator, required, maxLength} from '../../helpers/validation';

const itemValidation = createValidator({
  title: [required, maxLength(100)]
});
export default itemValidation;
