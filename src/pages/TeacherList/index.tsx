import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id);
                setFavorites(favoritedTeachersIds);
            }
        })
    }

    function handleToggleFilterVisible() {
        setIsFilterVisible(!isFilterVisible)
    }
    
    async function handleFilterSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
    
        setTeachers(response.data)
        setIsFilterVisible(!isFilterVisible)
        
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Encontre um proffy" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFilterVisible} >
                        <Feather name="search" size={30} color="#FFF" />
                    </BorderlessButton>
                )}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Ex: Literatura"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput 
                                style={styles.input}
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                                placeholder="Ex: Quarta-feira"
                                placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput 
                                style={styles.input}
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholder="Ex: 13:30"
                                placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton} >
                            <Text style={styles.submitButtonText}>Procurar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView 
                style={styles.teacherList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}>
                    
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id) ? true: false }
                    />
                    )
                })}
 
            </ScrollView>
        </View>
    )
}

export default TeacherList;