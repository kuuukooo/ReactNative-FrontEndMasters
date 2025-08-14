import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  View,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '../theme';
import { Entypo } from '@expo/vector-icons';

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Estas seguro que quieres borrar ${name}?`,
      'Esta acción no se puede deshacer.',
      [
        {
          text: 'Si',
          onPress: () => onDelete(),
          style: 'destructive',
        },
        {
          text: 'No',
          onPress: () => console.log('Borrado cancelado'),
          style: 'cancel',
        },
      ]
    );
  };
  return (
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onToggleComplete}
    >
      <View style={styles.row}>
        <Entypo name='check' size={24} color='black' />
        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <AntDesign
          name='closecircle'
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    textDecorationColor: theme.colorGrey,
    textDecorationLine: 'line-through',
    color: theme.colorGrey,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '200',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
});
