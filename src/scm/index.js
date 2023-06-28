import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "enter more then three value")
    .max(15)
    .required("Please Enter Your Name"),
  email: Yup.string().email("invalid email").required("Please Enter Your Full "),
  age: Yup.number("valid number is require").required("Please Enter Your Name"),
  // phone: Yup.number().required("Please Enter Your Name"),
  phone: Yup.string().matches(/^[6-9]\d{9}$/, {
    message: "Please enter valid number.",
    excludeEmptyString: false,
  }),
  // phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
  // avatar: Yup.string().min(3).max(15).required("Please Enter Your Name"),
});
