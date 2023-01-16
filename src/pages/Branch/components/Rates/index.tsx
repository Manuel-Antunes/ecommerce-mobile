import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { IconButton, TextInput, Colors, List, ActivityIndicator } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import FontAwesome from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import api from '../../../../services/api';
import { ApplicationState } from '../../../../store';
import { AuthState } from '../../../../store/ducks/auth/types';
import { Container, Headline } from '../global';
import { CommentName, HeartList, CommentContainer, CommentContent, CommentProfile, NoDataText } from './styles';
import userPlaceholder from '../../../../assets/placeholders/user-placeholder.png';
import { UserState } from '../../../../store/ducks/user/types';
import { useRefresh } from '../../../../contexts/Refresh/Context';
const Rates: React.FC<{ id: number | string, operation: string }> = ({ id, operation }) => {
  const [rate, setRate] = useState('');
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { refreshing } = useRefresh();
  const [sendButtonEnabled, setSendButtonEnabled] = useState(true);
  const auth = useSelector<ApplicationState, AuthState>((s) => s.auth);
  const user = useSelector<ApplicationState, UserState>((s) => s.user);
  useEffect(() => {
    fetchCommentsFromApi();
  }, [])
  useEffect(() => {
    if (refreshing) {
      fetchCommentsFromApi();
    }
  }, [refreshing])
  async function fetchCommentsFromApi() {
    setLoading(true);
    try {
      const { data } = await api.get('/' + operation + '/' + id + '/commentaries')
      setComments(data.reverse());
    } catch (err) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Ocorreu um erro.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 20,
      });
      console.log(err);
    }
    setLoading(false);
  }
  async function handleSendComment() {
    try {
      if (auth.data.signed) {
        setSendButtonEnabled(false);
        if (likes > 1) {
          try {
            const { data } = await api.post('/' + operation + '/' + id + '/commentaries', {
              content: rate,
              stars: likes
            });
            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Concluído',
              text2: 'Comentário adicionado com sucesso.',
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 20,
            });
            const a = [...comments];
            data.user = { name: user.data?.profile.displayName, photoUrl: user.data?.profile.photoURL };
            a.unshift(data);
            setComments(a);
            setSendButtonEnabled(true);
          } catch (err) {
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'Error',
              text2: 'Ocorreu um erro.',
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 20,
            });
            setSendButtonEnabled(true);
          }
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Selecione o numero de likes.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 20,
          });
        }
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: 'Você precisa estar logado para comentar.',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 20,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <Headline>Avaliações</Headline>
      <Text>Deixe uma nota</Text>
      <Likes onChange={setLikes} />
      <View style={{ padding: 10, paddingRight: 20 }}>
        <TextInput value={rate} onChangeText={setRate} maxLength={366} multiline label="Comentário *" />
        <Text style={{ alignSelf: 'flex-end', marginVertical: 10 }}>({rate.length}/366)</Text>
        <Button enabled={sendButtonEnabled} onPress={handleSendComment} style={{ width: 90, alignSelf: 'flex-end' }} icon={{ name: "chevron-right", position: 'right', margin_text: 10, color: "#FFF" }} >Enviar</Button>
      </View>
      <View>
        {loading ? <ActivityIndicator style={{ margin: 60 }} size="small" /> : comments.length === 0 ? <NoDataText>Nenhum Comentario Cadastrado</NoDataText> : comments.map(comment => (
          <Comment key={comment.id} img={comment.user.photoUrl} stars={comment.stars} content={comment.content} name={comment.user.name} />
        ))}
        {/* {loading ? <ActivityIndicator style={{ margin: 20 }} /> : <NoDataText>Nenhum Comentario Cadastrado</NoDataText>} */}
      </View>
    </Container>
  );
}

const Likes: React.FC<{ onChange(likes: number): void, disabled?: boolean }> = ({ onChange, disabled }) => {
  const [likes, setLikes] = useState(0);
  function ganerate() {
    const hearts = [];
    for (let i = 1; i <= 5; i++) {
      hearts.push(
        <IconButton color={Colors.indigo500} key={i} onPress={() => {
          if (!disabled) {
            onChange(i);
            setLikes(i)
          }
        }} icon={props => <FontAwesome name={i <= likes ? 'heart' : 'heart-outline'} {...props} />} />
      )
    }
    return hearts;
  }
  return (
    <HeartList>
      {ganerate()}
    </HeartList>);
}

const Comment: React.FC<{ img?: string, name: string, content: string, stars: number }> = ({ content, img, name, stars }) => {
  function generate() {
    const starsL = [];
    for (let i = 1; i <= 5; i++) {
      starsL.push(
        <FontAwesome key={i} color={Colors.indigo500} size={20} name={i <= stars ? 'heart' : 'heart-outline'} />)
    }
    return (
      <HeartList>
        {starsL}
      </HeartList>
    );
  }

  return (
    <CommentContainer style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        {img ? <CommentProfile source={{ uri: img }} /> : <CommentProfile source={userPlaceholder} />}
        <CommentName>{name}</CommentName>
      </View>
      {generate()}
      <CommentContent>{content}</CommentContent>
    </CommentContainer>
  );
}

export default Rates;
