import React, { useState } from 'react';
import { View } from 'react-native';
import { Field, ErrorMessage } from 'formik';

// Components
import ValidationMessageComponent from '../ValidationMessage/ValidationMessageComponent';

interface Props {
  input: any;
  customProps?: any;
  containerStyle?: any;
  labelStyle?: any;
  subContainerStyle?: any;
  readOnly?: boolean;
}

function Input(props: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const {
    input,
    customProps,
    containerStyle,
    subContainerStyle,
    readOnly,
  } = props;

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <View style={containerStyle} key={input.name}>
      <View style={subContainerStyle}>
        <Field name={input.name}>
          {({
            field,
            form: {
              values: { country },
            },
          }: any) =>
            input.render(
              { ...input, country },
              { ...field, readOnly, isFocus, onHandlerFocus, onHandlerBlur },
              customProps,
            )
          }
        </Field>
        <ErrorMessage
          // @ts-ignore
          component={ValidationMessageComponent}
          name={input.name}
        />
      </View>
    </View>
  );
}

export default Input;
