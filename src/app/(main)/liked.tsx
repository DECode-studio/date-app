import { FlatList, StyleSheet, View } from "react-native";
import { useLikedPeople } from "../../features/people/hooks";
import PersonCard from "../../components/organisms/PersonCard";

export default function Liked() {
    const { data } = useLikedPeople();
    return (
        <View style={styles.container}>
            <FlatList
                data={data || []}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <PersonCard person={item} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    listContent: {
        paddingBottom: 24,
    },
    cardWrapper: {
        marginBottom: 24,
    },
});
