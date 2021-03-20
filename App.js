import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== goalId)
    });
  }

  const cancelGoalAddHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancelAdd={cancelGoalAddHandler} />
      <FlatList
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            onDelete={removeGoalHandler}
            id={itemData.item.id}
            title={itemData.item.value}
          />
        )}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
