import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { IconButton, Colors, TextInput, Chip, Checkbox, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigableSection from '../../components/NavigableSection';
import NavProvider from '../../contexts/Nav/Provider';
import { Container, Headline, Tags, FilterGroups, Subheadline, CheckboxLabel } from './styles';

export interface FilterInjectorProps {
  route: {
    params: {
      busca: string;
      filters: any;
    }
  }
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.indigo500,
    acent: Colors.indigo500
  },
};

const FilterInjector: React.FC<FilterInjectorProps> = ({ route }) => {
  useEffect(() => {
    console.log(route.params);

  }, []);
  const [tags, setTags] = useState<any[]>([]);
  const [nameTag, setNameTag] = useState('');
  const [showProducts, setShowProducts] = useState(route.params.filters ? route.params.filters.showProducts : true);
  const [showServices, setShowServices] = useState(true);
  const [showEnterprises, setShowEnterprises] = useState(true);
  const [categoryHandicraft, setCategoryHandicraft] = useState(true);
  const [categoryTour, setCategoryTour] = useState(true);
  const [categoryHosts, setCategoryHosts] = useState(true);
  const [categoryMeal, setCategoryMeal] = useState(true);
  const Navigation = useNavigation();
  function handleApplyFilters() {
    const f = {
      ...route.params?.filters,
      showProducts,
      showServices,
      showEnterprises,
      categoryHandicraft,
      categoryTour,
      categoryHosts,
      categoryMeal,
    }
    Navigation.navigate('Search', { filters: f });
  }
  function handleAddTag() {
    const t = tags.find(t => {
      return t.name === nameTag;
    })
    if (!t) {
      setTags([...tags, { name: nameTag }]);
    }
  }
  return (
    <PaperProvider settings={{
      icon: props => <FontAwesome {...props} />,
    }} theme={theme}>
      <NavProvider>
        <NavigableSection sideBarColor="#7159c1" name="filters" >
          <Container>
            <IconButton onPress={handleApplyFilters} icon="chevron-left" size={20} color={Colors.indigo500}></IconButton>
            <Headline>Filtrar Por</Headline>
            <TextInput value={nameTag} onChangeText={setNameTag} label="Adicionar tag" onSubmitEditing={handleAddTag} />
            <Tags contentContainerStyle={{ flexDirection: "row", flexWrap: 'wrap', width: "100%", }} >
              {tags.map((t: any) => (
                <Chip key={t.name} style={{ margin: 10 }} icon="info" onPress={() => console.log('Pressed')}>{t.name}</Chip>
              ))}
            </Tags>
            <FilterGroups>
              <Subheadline>Exibir</Subheadline>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Checkbox color={Colors.indigo500} status={showProducts ? 'checked' : 'unchecked'} onPress={() => setShowProducts(!showProducts)} ></Checkbox>
                <CheckboxLabel>Produtos</CheckboxLabel>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox color={Colors.indigo500} status={showServices ? 'checked' : 'unchecked'} onPress={() => setShowServices(!showServices)} ></Checkbox>
                <CheckboxLabel>Serviços</CheckboxLabel>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox color={Colors.indigo500} status={showEnterprises ? 'checked' : 'unchecked'} onPress={() => setShowEnterprises(!showEnterprises)} ></Checkbox>
                <CheckboxLabel>Empresas</CheckboxLabel>
              </View>
            </FilterGroups>
            <FilterGroups>
              <Subheadline>Categorias</Subheadline>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox color={Colors.indigo500} status={categoryHandicraft ? 'checked' : 'unchecked'} onPress={() => setCategoryHandicraft(!categoryHandicraft)} ></Checkbox>
                <CheckboxLabel>Artesanato</CheckboxLabel>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox color={Colors.indigo500} status={categoryTour ? 'checked' : 'unchecked'} onPress={() => setCategoryTour(!categoryTour)} ></Checkbox>
                <CheckboxLabel>Passeio</CheckboxLabel>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox color={Colors.indigo500} status={categoryHosts ? 'checked' : 'unchecked'} onPress={() => setCategoryHosts(!categoryHosts)} ></Checkbox>
                <CheckboxLabel>Pousadas</CheckboxLabel>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox color={Colors.indigo500} status={categoryMeal ? 'checked' : 'unchecked'} onPress={() => setCategoryMeal(!categoryMeal)} ></Checkbox>
                <CheckboxLabel>Restaurantes</CheckboxLabel>
              </View>
            </FilterGroups>
          </Container>
        </NavigableSection>
      </NavProvider>
    </PaperProvider>
  );
}

export default FilterInjector;
