import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import teachBackground from '../../assets/images/give-classes-background.png'

import styles from './styles';

function Teach() {

    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
                source={teachBackground} 
                style={styles.content}
                resizeMode='contain'
            >
                <Text style={styles.title}>
                    Quer ser um Proffy?     
                </Text>              
                <Text style={styles.description}>
                    Legal! Vamos começar fazendo seu cadastro na nossa plataforma
                </Text>      
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={handleNavigateBack}>
                <Text style={styles.okButtonText}>Ok, vamos lá!</Text>
            </RectButton>
        </View>
    )
}

export default Teach;