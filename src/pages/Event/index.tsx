import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, ScrollView } from 'react-native';
import NavigableSection from '../../components/NavigableSection';
import api from '../../services/api';
import { ActivityIndicator, Colors, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { Container, Headline, Subheadline, Cover, Description } from './styles';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import NavProvider from '../../contexts/Nav/Provider';

interface EventProps {
  route: {
    params: {
      id: number;
    }
  }
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.indigo500,

  },
};

const Event: React.FC<EventProps> = ({ route }) => {
  const [event, setEvent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const capitalize = (word: string) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();
  useEffect(() => {
    setLoading(true);
    getEventData();
  }, []);
  async function getEventData() {
    try {
      const { data } = await api.get('/events/' + route.params.id);
      data.dateFormatted = capitalize(
        format(parseISO(data.date), "eeee', dia' dd 'de' MMMM", { locale: pt })
      );
      setEvent(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }
  return (
    <PaperProvider settings={{
      icon: props => <FontAwesome {...props} />,
    }} theme={theme}>
      <NavProvider>
        <NavigableSection sideBarColor="#4cac54" name="events" >
          <Container style={{ marginTop: 70 }}>
            {loading ? <ActivityIndicator style={{ position: 'absolute', top: '50%', left: '50%' }} ></ActivityIndicator> : error ? <Text>deu merda</Text> :
              (
                <>
                  <Cover>
                    <ImageBackground imageStyle={{ resizeMode: "stretch" }} style={
                      {
                        flex: 1,
                        justifyContent: "center",
                      }
                    } source={{ uri: event.midia ? event.midia.url : 'penedo' }}>
                    </ImageBackground>
                  </Cover>
                  <Headline>{event.title}</Headline>
                  <Description>{event.description}</Description>
                  <Subheadline>
                    <FontAwesome name="location-on" />
                    {" "}
                    {event.location}
                  </Subheadline>
                  <Subheadline>
                    <FontAwesome name="calendar-today" />
                    {" "}
                    {event.dateFormatted}
                  </Subheadline>
                </>
              )
            }
          </Container>
        </NavigableSection>
      </NavProvider>
    </PaperProvider>
  );
}

export default Event;
