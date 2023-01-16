import React, { useEffect, useMemo, useState } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import { Avatar, Button, Card, IconButton, Title } from 'react-native-paper';
import logoImg from '../../assets/login/Penedo.png';
import pt from 'date-fns/locale/pt';
import { ActivityIndicator, Colors } from 'react-native-paper';
import {
  addMonths,
  differenceInCalendarMonths,
  format,
  parseISO,
  subMonths,
} from 'date-fns';
import { Bar, DateText, EventList } from './styles';
import { BackgroundGlobal, Container, Headline, LoadingHandler, SideBar, Wraper } from '../global';
import api from '../../../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useRefresh } from '../../../../contexts/Refresh/Context';
import HomeLogo from '../../../../assets/icons/Today.png';

const Events: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const { refreshing } = useRefresh();
  const [loading, setLoading] = useState(false);
  const handlePrevDays = () => setDate(subMonths(date, 1));
  const handleNextDays = () => setDate(addMonths(date, 1));
  const Navigation = useNavigation();
  const capitalize = (word: string) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();
  useEffect(() => {
    getEventsFromApi();
  }, [date]);
  useEffect(() => {
    if (refreshing) {
      getEventsFromApi();
    }
  }, [refreshing])
  async function getEventsFromApi() {
    setLoading(true);
    try {
      api
        .get(`/events?month=${(differenceInCalendarMonths(date, new Date()))}`)
        .then((response) => {
          const r: any[] = [];
          response.data.map((event: any) =>
            r.push({
              dateFormatted: capitalize(
                format(parseISO(event.date), "eeee', dia' dd")
              ),
              ...event,
            })
          );
          setEvents(r);
          setLoading(false);
        })
    } catch (err) {

    }
  }
  const dateFormatted = useMemo(
    () => capitalize(format(date, "MMMM 'de' yyyy", { locale: pt })),
    [date]
  );
  function getEvents() {
    function handleShowEvent(id: number) {
      Navigation.navigate('Event', { id })
    }
    return events.map((e, index) => (
      <Card style={
        {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          marginBottom: 10,
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        }} key={index}>

        <Card.Title leftStyle={{ marginLeft: 30 }} title={e.title} subtitle={e.location} left={props =>
          <View style={{ width: 90, height: 100, borderRadius: 20 }}>
            <ImageBackground source={{ uri: e.midia ? e.midia.url : 'penedo' }} style={{ width: '100%', height: '100%', top: 25, right: 40, borderRadius: 20 }} />
          </View>}
        />
        <Card.Actions style={{ left: 200 }} >
          <Button onPress={() => { handleShowEvent(e.id) }}>Saiba mais</Button>
        </Card.Actions>
      </Card>
    ))
  }
  return (
    <BackgroundGlobal source={HomeLogo}>
      <Container>
        <Headline>Eventos</Headline>
        <Bar>
          <IconButton size={20} color="#757575" onPress={handlePrevDays} icon="chevron-left"></IconButton >
          <Text>{dateFormatted}</Text>
          <IconButton size={20} color="#757575" onPress={handleNextDays} icon="chevron-right"></IconButton >
        </Bar>
        {events.length > 0 ?
          <EventList >
            {loading ? <LoadingHandler><ActivityIndicator animating={true} color={Colors.indigo500} /></LoadingHandler> : getEvents()}
          </EventList>
          :
          <LoadingHandler>{loading ? <ActivityIndicator animating={true} color={Colors.indigo500} />
            : <DateText>Não há eventos no mês selecionado</DateText>}</LoadingHandler>
        }
      </Container>
    </BackgroundGlobal>
  );
}

export default Events;
