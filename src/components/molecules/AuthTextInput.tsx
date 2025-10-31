import { TextInput as PaperTextInput, HelperText, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

type Props = {
    label: string;
    icon?: string;
    helperText?: ReactNode;
} & React.ComponentProps<typeof PaperTextInput>;

export default function AuthTextInput({ label, icon, helperText, style, ...props }: Props) {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <PaperTextInput
                mode="outlined"
                label={label}
                style={[styles.input, style]}
                left={icon ? <PaperTextInput.Icon icon={icon} /> : undefined}
                outlineStyle={styles.outline}
                {...props}
                theme={{
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: "#6750A4",
                    },
                }}
            />
            {helperText ? (
                <HelperText type="info" visible>
                    {helperText}
                </HelperText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: "white",
    },
    outline: {
        borderRadius: 18,
    },
});
