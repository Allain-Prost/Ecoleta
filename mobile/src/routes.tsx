import React from 'react';
//limpar a cache, pra essa merda pegar 
// "expo r -c"
import { NavigationContainer } from '@react-navigation/native';
// é uma navegação em pilha, eu consigo chamar as proximas telas e as telas anteriores elas não deixam de exister 
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home'
import Points from './pages/Points'
import Detail from './pages/Detail'

//Olhar documentação. Vai ser o responsável pelo roteamento da aplicação
const AppStack = createStackNavigator();

const Routes = () => {
    //Digamos que define como nossas rotas devem se comportar, ele deve estar em volta de todas as rotas
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none" 
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#F0F0F5',
                    }
                }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;

