import { Text, View } from "react-native";
import { getWidth } from "../Theme/constens";

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    error: (props: any) => (
        <View
            style={{
                backgroundColor: '#FFF5F5',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                width: getWidth(1) - 40,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 3,
                borderLeftWidth: 5,
                borderLeftColor: '#C53030',
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#C53030',
                    marginBottom: 4,
                }}
            >
                {props.text1}
            </Text>
            {props.text2 ? (
                <Text
                    style={{
                        fontSize: 14,
                        color: '#4A5568',
                    }}
                >
                    {props.text2}
                </Text>
            ) : null}
        </View>
    )
    ,
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    success: (props: any) => (
        <View
            style={{
                backgroundColor: '#E6FFFA',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 12,
                width: getWidth(1) - 40,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 3,
                borderLeftWidth: 5,
                borderLeftColor: '#2F855A',
            }}
        >
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#2F855A',
                    marginBottom: 4,
                }}
            >
                {props.text1}
            </Text>
            {props.text2 ? (
                <Text
                    style={{
                        fontSize: 14,
                        color: '#4A5568',
                    }}
                >
                    {props.text2}
                </Text>
            ) : null}
        </View>
    )

};