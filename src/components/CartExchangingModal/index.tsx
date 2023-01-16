import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, IconButton, List, TextInput } from 'react-native-paper';
import { Modal, Headline, Subhead, Selector } from './styles';
import { produce } from 'immer'
import { Container } from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { Cart, CartState } from '../../store/ducks/cart/types';
import { fetchUserCartSuccess, requestCartSync } from '../../store/ducks/cart/actions';
export interface CardExchangingModalProps {
  visible: boolean;
  onDismiss: () => void;
}
const CardExchangingModal: React.FC<CardExchangingModalProps> = ({ visible, onDismiss }) => {
  const { data: cart } = useSelector<ApplicationState, CartState>((state) => state.cart)
  const helper = useSelector<ApplicationState, any>((state) => state.cart.helperCart)
  const [content, setContent] = useState<Cart>(cart)
  const [ocontent, setOcontent] = useState<Cart>(helper)
  const [selecteds, setSelecteds] = useState<any[]>([])
  const dispatch = useDispatch();

  useEffect(() => {
    setContent(cart)
    setOcontent(helper)
    setSelecteds([])
  }, [visible])

  function handleSubmit() {
    dispatch(requestCartSync(content));
  }

  function handleSelect(product: any) {
    if (isSelected(product)) {
      const a = [...selecteds];
      const index = selecteds.findIndex(s => {
        return product.id === s.id
      })
      a.splice(index, 1);
      setSelecteds(a);
    } else {
      const a = [...selecteds];
      a.push(product);
      setSelecteds(a);
    }
  }
  function handleSendToContent() {
    if (content && ocontent) {
      const c = { ...content };
      const oc = { ...ocontent };
      const filtred = selecteds.filter(s => {
        const exists = c.products.find(p => {
          return p.id === s.id
        })
        if (!exists) {
          return true
        } else {
          return false
        }
      })
      c.products?.push(...filtred);
      selecteds.forEach((s) => {
        const index = oc.products.findIndex((cs) => {
          return cs.id === s.id;
        })
        if (index >= 0) {
          oc.products.splice(index, 1);
        }
      })
      setSelecteds([])
      setOcontent(oc);
      setContent(c);
    }
  }
  function handleRemoveFromContent() {
    if (content && ocontent) {
      const c = { ...content };
      const oc = { ...ocontent };
      const filtred = selecteds.filter(s => {
        const exists = oc.products.find(p => {
          return p.id === s.id
        })
        if (!exists) {
          return true
        } else {
          return false
        }
      })

      oc.products?.push(...filtred);
      selecteds.forEach((s) => {
        const index = c.products.findIndex((cs) => {
          return cs.id === s.id;
        })
        if (index >= 0) {
          c.products.splice(index, 1);
        }
      })
      setSelecteds([])
      setOcontent(oc);
      setContent(c);
    }
  }

  function isSelected(p: any): boolean {
    const isSelected = selecteds.find(s => {
      return p.id === s.id
    })
    return isSelected ? true : false;
  }
  return (
    <Modal visible={visible}>
      <Container>
        <Headline>Você já possuia um carrinho na sua conta</Headline>
        <Subhead>Selecione quais produtos você deseja manter no carrinho</Subhead>
        <Selector>
          <ScrollView>
            {ocontent.products.map((p: any) => {
              return (
                <List.Item onPress={() => { handleSelect(p) }} style={{ backgroundColor: isSelected(p) ? "#e0e0e0" : "#FFF", borderRadius: 5 }} key={p.id} title={p.content.name}
                  description={`qtd: ${p.pivot_amount}`}
                />
              )
            }
            )}
          </ScrollView>
          <View>
            <IconButton size={10} icon="chevron-right" />
            <IconButton size={10} icon="chevron-left" onPress={handleRemoveFromContent} />
            <IconButton size={10} icon="chevron-right" onPress={handleSendToContent} />
            <IconButton size={10} icon="chevron-left" />
          </View>
          <ScrollView>
            {content.products.map((p: any) => (
              <List.Item onPress={() => { handleSelect(p) }} style={{ backgroundColor: isSelected(p) ? "#e0e0e0" : "#FFF", borderRadius: 5 }} key={p.id} title={p.content.name}
                description={`qtd: ${p.pivot_amount}`}
              />
            ))}
          </ScrollView>
        </Selector>
        <Button onPress={handleSubmit} style={{ alignSelf: 'flex-end' }} >Continuar</Button>
      </Container>
    </Modal>
  );
}

export default CardExchangingModal;
