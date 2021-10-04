import React from 'react';
import * as Yup from 'yup';
import { Input, Icon, InputProps } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';
// @ts-ignore
import { isValidNumber } from 'libphonenumber-js';

// Constants
import { passwordPattern } from './patternsConstants';
import { TextConstants } from './textConstants';

// Assets
import { Colors, GeneralStyles } from '../assets/';

// Utils
import { capitalizeFirst } from '../utils/helpers';

// Components
import {
  CustomSwitchComponent as Switch,
  PhoneNumberInputComponent,
  CustomSelectComponent as Select,
} from '../components/common/';

export const getCommonProps = (field: any) => ({
  labelStyle: [GeneralStyles.label, GeneralStyles.fontSize18],
  placeholderTextColor: Colors.mediumWhite,
  inputStyle: {
    color: Colors.white,
    ...GeneralStyles.fontSize16,
  },
  inputContainerStyle: {
    borderBottomColor: field.isFocus ? Colors.white : Colors.mediumWhite,
    height: moderateScale(40, 0.3),
  },
  onFocus: field?.onHandlerFocus,
  onBlur: field?.onHandlerBlur,
  containerStyle: {
    paddingHorizontal: 0,
  },
});

interface Props extends InputProps {
  field: any;
}

export const FilterInput = ({ field, ...otherProps }: Props) => {
  const commonProps = getCommonProps(field);

  return <Input ref={field.ref} {...commonProps} {...otherProps} />;
};

export const fields = {
  document: {
    name: TextConstants.DOCUMENT_NAME,
    initialValue: '',
    label: TextConstants.DOCUMENT_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .required(TextConstants.DOCUMENT_REQUIRED)
      .min(8, TextConstants.DOCUMENT_MIN),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  name: {
    name: TextConstants.NAME_NAME,
    initialValue: '',
    label: TextConstants.NAME_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.NAME_REQUIRED)
      .min(3, TextConstants.NAME_MIN),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={capitalizeFirst(field.value)}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
        />
      );
    },
  },
  password: {
    name: TextConstants.PASSWORD_NAME,
    initialValue: '',
    label: TextConstants.PASSWORD_LABEL,
    validation: Yup.string()
      .trim()
      .required(TextConstants.PASSWORD_REQUIRED)
      .min(8, TextConstants.PASSWORD_MIN)
      .matches(passwordPattern, TextConstants.PASSWORD_INVALID),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;
      const { onClick, isVisible } = customProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          secureTextEntry={!isVisible}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          rightIcon={
            <Icon
              type="ionicon"
              name={isVisible ? 'ios-eye-off' : 'ios-eye'}
              color={Colors.white}
              size={moderateScale(30, 0.3)}
              onPress={onClick}
              underlayColor={Colors.transparent}
            />
          }
          {...commonProps}
        />
      );
    },
  },
  code: {
    name: TextConstants.CODE_NAME,
    initialValue: '',
    label: TextConstants.CODE_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .required(TextConstants.CODE_REQUIRED)
      .min(6, TextConstants.CODE_MIN)
      .max(6, TextConstants.CODE_MIN),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  canCreateSpecialCredits: {
    name: TextConstants.CAN_CREATE_SPECIAL_CREDITS_NAME,
    initialValue: false,
    label: TextConstants.CAN_CREATE_SPECIAL_CREDITS_LABEL,
    validation: Yup.boolean(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: boolean) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Switch
          label={label}
          value={field.value}
          testID={id}
          onValueChange={handlerChange}
        />
      );
    },
  },
  canEditPhone: {
    name: TextConstants.CAN_EDIT_PHONE_NAME,
    initialValue: false,
    label: TextConstants.CAN_EDIT_PHONE_LABEL,
    validation: Yup.boolean(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: boolean) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Switch
          label={label}
          value={field.value}
          testID={id}
          onValueChange={handlerChange}
        />
      );
    },
  },
  canCreateClientInMultipleRoutes: {
    name: TextConstants.CAN_CREATE_CLIENT_IN_MULTIPLES_ROUTES_NAME,
    initialValue: false,
    label: TextConstants.CAN_CREATE_CLIENT_IN_MULTIPLES_ROUTES_LABEL,
    validation: Yup.boolean(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: boolean) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Switch
          label={label}
          value={field.value}
          testID={id}
          onValueChange={handlerChange}
        />
      );
    },
  },
  maximumDaysToCancel: {
    name: TextConstants.MAXIMUM_DAYS_TO_CANCEL_NAME,
    initialValue: '2',
    label: TextConstants.MAXIMUM_DAYS_TO_CANCEL_LABEL,
    validation: Yup.number()
      .required(TextConstants.MAXIMUM_DAYS_TO_CANCEL_REQUIRED)
      .test(
        'minValue',
        TextConstants.MAXIMUM_DAYS_TO_CANCEL_MIN,
        (val) => val > 0,
      ),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  minimumCreditValue: {
    name: TextConstants.MINIMUM_CREDIT_VALUE_NAME,
    initialValue: '0',
    label: TextConstants.MINIMUM_CREDIT_VALUE_LABEL,
    validation: Yup.number().required(
      TextConstants.MINIMUM_CREDIT_VALUE_REQUIRED,
    ),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  maximumCreditValue: {
    name: TextConstants.MAXIMUM_CREDIT_VALUE_NAME,
    initialValue: '0',
    label: TextConstants.MAXIMUM_CREDIT_VALUE_LABEL,
    validation: Yup.number().required(
      TextConstants.MAXIMUM_CREDIT_VALUE_REQUIRED,
    ),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  minimumPercent: {
    name: TextConstants.MINIMUM_PERCENT_NAME,
    initialValue: '0',
    label: TextConstants.MINIMUM_PERCENT_LABEL,
    validation: Yup.number().required(TextConstants.MINIMUM_PERCENT_REQUIRED),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  maximumPercent: {
    name: TextConstants.MAXIMUM_PERCENT_NAME,
    initialValue: '0',
    label: TextConstants.MAXIMUM_PERCENT_LABEL,
    validation: Yup.number().required(TextConstants.MAXIMUM_PERCENT_REQUIRED),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  partners: {
    name: TextConstants.PARTNERS_NAME,
    initialValue: '',
    label: TextConstants.PARTNERS_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.PARTNERS_REQUIRED)
      .min(3, TextConstants.PARTNERS_MIN),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
        />
      );
    },
  },
  phoneNumber: {
    name: TextConstants.PHONE_NUMBER_NAME,
    label: TextConstants.PHONE_NUMBER_LABEL,
    initialValue: '',
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.PHONE_NUMBER_REQUIRED)
      .test({
        name: 'vlidFormat',
        exclusive: true,
        message: TextConstants.PHONE_NUMBER_INVALID,
        test: (value) => isValidNumber(value),
      }),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <PhoneNumberInputComponent
          initialCountry="CO"
          label={label}
          testID={id}
          onChangeText={handlerChange}
          value={field.value}
          {...commonProps}
        />
      );
    },
  },
  cityId: {
    name: TextConstants.CITY_NAME,
    initialValue: '',
    label: TextConstants.CITY_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.CITY_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  officeId: {
    name: TextConstants.OFFICE_NAME,
    initialValue: '',
    label: TextConstants.OFFICE_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.OFFICE_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        if (customProps.onOfficeChange) {
          customProps.onOfficeChange(value, customProps.setFieldValue);
        }

        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  permitirAbonos: {
    name: TextConstants.PERMITIR_ABONOS_NAME,
    initialValue: false,
    label: TextConstants.PERMITIR_ABONOS_LABEL,
    validation: Yup.boolean(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: boolean) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Switch
          label={label}
          value={field.value}
          testID={id}
          onValueChange={handlerChange}
        />
      );
    },
  },
  canCreateClient: {
    name: TextConstants.CAN_CREATE_CLIENTS_NAME,
    initialValue: false,
    label: TextConstants.CAN_CREATE_CLIENTS_LABEL,
    validation: Yup.boolean(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: boolean) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Switch
          label={label}
          value={field.value}
          testID={id}
          onValueChange={handlerChange}
        />
      );
    },
  },
  description: {
    name: TextConstants.DESCRIPTION_NAME,
    initialValue: '',
    label: TextConstants.DESCRIPTION_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.DESCRIPTION_REQUIRED)
      .min(3, TextConstants.DESCRIPTION_MIN),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          multiline={true}
          numberOfLines={4}
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
          inputContainerStyle={{
            borderBottomColor: field.isFocus
              ? Colors.white
              : Colors.mediumWhite,
            minHeight: moderateScale(40, 0.3),
          }}
        />
      );
    },
  },
  documentTypeId: {
    name: TextConstants.DOCUMENT_TYPE_NAME,
    initialValue: '',
    label: TextConstants.DOCUMENT_TYPE_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.DOCUMENT_TYPE_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  lastName: {
    name: TextConstants.LAST_NAME_NAME,
    initialValue: '',
    label: TextConstants.LAST_NAME_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.LAST_NAME_REQUIRED)
      .min(3, TextConstants.LAST_NAME_REQUIRED),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
        />
      );
    },
  },
  address: {
    name: TextConstants.ADDRESS_NAME,
    initialValue: '',
    label: TextConstants.ADDRESS_LABEL,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
        />
      );
    },
  },
  cityIdNoRequired: {
    name: TextConstants.CITY_NAME,
    initialValue: '',
    label: TextConstants.CITY_LABEL_NO_REQUIRED,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  routeId: {
    name: TextConstants.ROUTE_NAME,
    initialValue: '',
    label: TextConstants.ROUTE_LABEL,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  officeIdNoRequired: {
    name: TextConstants.OFFICE_NAME,
    initialValue: '',
    label: TextConstants.OFFICE_LABEL_NO_REQUIRED,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  rolId: {
    name: TextConstants.ROL_NAME,
    initialValue: '',
    label: TextConstants.ROL_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.ROL_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  passwordNoRequired: {
    name: TextConstants.PASSWORD_NAME,
    initialValue: '',
    label: TextConstants.PASSWORD_LABEL_NO_REQUIRED,
    validation: Yup.string()
      .trim()
      .min(8, TextConstants.PASSWORD_MIN)
      .matches(passwordPattern, TextConstants.PASSWORD_INVALID),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;
      const { onClick, isVisible } = customProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          secureTextEntry={!isVisible}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          rightIcon={
            <Icon
              type="ionicon"
              name={isVisible ? 'ios-eye-off' : 'ios-eye'}
              color={Colors.white}
              size={moderateScale(30, 0.3)}
              onPress={onClick}
              underlayColor={Colors.transparent}
            />
          }
          {...commonProps}
        />
      );
    },
  },
  alias: {
    name: TextConstants.ALIAS_NAME,
    initialValue: '',
    label: TextConstants.ALIAS_LABEL,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={capitalizeFirst(field.value)}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
        />
      );
    },
  },
  housePhoneNumber: {
    name: TextConstants.HOUSE_PHONE_NUMBER_NAME,
    label: TextConstants.HOUSE_PHONE_NUMBER_LABEL,
    initialValue: '',
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .test({
        name: 'vlidFormat',
        exclusive: true,
        message: TextConstants.HOUSE_PHONE_NUMBER_INVALID,
        test: (value) => {
          if (!value || value.length === 0) {
            return true;
          }
          return isValidNumber(value);
        },
      }),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <PhoneNumberInputComponent
          initialCountry="CO"
          label={label}
          testID={id}
          onChangeText={handlerChange}
          value={field.value}
          {...commonProps}
        />
      );
    },
  },
  details: {
    name: TextConstants.DETAILS_NAME,
    initialValue: '',
    label: TextConstants.DETAILS_LABEL,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          multiline={true}
          numberOfLines={4}
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
          inputContainerStyle={{
            borderBottomColor: field.isFocus
              ? Colors.white
              : Colors.mediumWhite,
            minHeight: moderateScale(40, 0.3),
          }}
        />
      );
    },
  },
  detailsRequired: {
    name: TextConstants.DETAILS_NAME,
    initialValue: '',
    label: TextConstants.DETAILS_LABEL_REQUIRED,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.DETAILS_REQUIRED),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          multiline={true}
          numberOfLines={4}
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
          inputContainerStyle={{
            borderBottomColor: field.isFocus
              ? Colors.white
              : Colors.mediumWhite,
            minHeight: moderateScale(40, 0.3),
          }}
        />
      );
    },
  },
  routeIdRequired: {
    name: TextConstants.ROUTE_NAME,
    initialValue: '',
    label: TextConstants.ROUTE_LABEL_REQUIRED,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.ROUTE_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        if (customProps.onRouteChange) {
          customProps.onRouteChange(value, customProps.setFieldValue);
        }

        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  addressRequired: {
    name: TextConstants.ADDRESS_NAME,
    initialValue: '',
    label: TextConstants.ADDRESS_LABEL_REQUIRED,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.ADDRESS_REQUIRED),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          {...commonProps}
        />
      );
    },
  },
  client: {
    name: TextConstants.CLIENT_NAME,
    initialValue: '',
    label: TextConstants.CLIENT_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.CLIENT_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  payment_periosity: {
    name: TextConstants.PAYMENT_PERIOSITY_NAME,
    initialValue: '',
    label: TextConstants.PAYMENT_PERIOSITY_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.PAYMENT_PERIOSITY_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  amount: {
    name: TextConstants.AMOUNT_NAME,
    initialValue: '2',
    label: TextConstants.AMOUNT_LABEL,
    validation: Yup.number()
      .required(TextConstants.AMOUNT_REQUIRED)
      .test('minValue', TextConstants.AMOUNT_MIN, (val) => val > 0),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  duration: {
    name: TextConstants.DURATION_NAME,
    initialValue: '2',
    label: TextConstants.DURATION_LABEL,
    validation: Yup.number()
      .required(TextConstants.DURATION_REQUIRED)
      .test('minValue', TextConstants.DURATION_MIN, (val) => val > 0),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  specialCredit: {
    name: TextConstants.SPECIAL_CREDIT_NAME,
    initialValue: false,
    label: TextConstants.SPECIAL_CREDIT_LABEL,
    validation: Yup.boolean(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: boolean) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Switch
          label={label}
          value={field.value}
          testID={id}
          onValueChange={handlerChange}
        />
      );
    },
  },
  advancement: {
    name: TextConstants.ADVANCEMENT_NAME,
    initialValue: '2',
    label: TextConstants.ADVANCEMENT_LABEL,
    validation: Yup.number(),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  percent: {
    name: TextConstants.PERCENT_NAME,
    initialValue: '0',
    label: TextConstants.PERCENT_LABEL,
    validation: Yup.number().required(TextConstants.PERCENT_REQUIRED),
    render: (inputProps: any, field: any) => {
      const { name: id, label } = inputProps;
      const commonProps = getCommonProps(field);

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Input
          label={label}
          value={field.value}
          testID={id}
          onChangeText={handlerChange}
          keyboardType="numeric"
          {...commonProps}
        />
      );
    },
  },
  _advancement_type: {
    name: TextConstants.ADVANCEMENT_TYPE_NAME,
    initialValue: '',
    label: TextConstants.ADVANCEMENT_TYPE_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.ADVANCEMENT_TYPE_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  income_expense_type: {
    name: TextConstants.INCOME_EXPENSE_TYPE_NAME,
    initialValue: '',
    label: TextConstants.INCOME_EXPENSE_TYPE_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.INCOME_EXPENSE_TYPE_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        customProps.onTypeChange(value, customProps.setFieldValue);
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  income_expense_category: {
    name: TextConstants.INCOME_EXPENSE_CATEGORY_NAME,
    initialValue: '',
    label: TextConstants.INCOME_EXPENSE_CATEGORY_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.INCOME_EXPENSE_CATEGORY_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        customProps.onCategoryChange(value, customProps.setFieldValue);
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  income_expense_concept: {
    name: TextConstants.INCOME_EXPENSE_CONCEPT_NAME,
    initialValue: '',
    label: TextConstants.INCOME_EXPENSE_CONCEPT_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .required(TextConstants.INCOME_EXPENSE_CONCEPT_REQUIRED),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  route_origin: {
    name: TextConstants.ROUTE_ORIGIN_NAME,
    initialValue: '',
    label: TextConstants.ROUTE_ORIGIN_LABEL,
    validation: Yup.string()
      .ensure()
      .trim()
      .lowercase()
      .when('route_destination', {
        is: '',
        then: Yup.string()
          .ensure()
          .trim()
          .lowercase()
          .required(TextConstants.ORIGIN_DESTINATION_REQUIRED),
      }),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
  route_destination: {
    name: TextConstants.ROUTE_DESTINATION_NAME,
    initialValue: '',
    label: TextConstants.ROUTE_DESTINATION_LABEL,
    validation: Yup.string().ensure().trim().lowercase(),
    render: (inputProps: any, field: any, customProps: any) => {
      const { name: id, label } = inputProps;

      const handlerChange = (value: string) => {
        field.onChange({
          currentTarget: { id },
          target: { value, name: id },
        });
      };

      return (
        <Select
          value={field.value}
          options={customProps.data}
          hashOptions={customProps.hashTable}
          label={label}
          onValueChange={handlerChange}
        />
      );
    },
  },
};
