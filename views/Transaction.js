import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  AsyncStorage,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Layout, Spinner, Radio, RadioGroup, Modal, Card } from "@ui-kitten/components";
import { Button, Text } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import MyBidProducts from "../components/MyFinalBid";
import CarouselFinalBid from '../components/MyFinalBidCard'
const { height, width } = Dimensions.get("window");

const UPDATE_RATING = gql`
mutation updateRating(
  $FinalBidderId: String!
  $FinalBidderRating: Int!
  ){
    updateRating(
      FinalBidderId: $FinalBidderId
      FinalBidderRating: $FinalBidderRating
    ) {
 	  status
  	message
    user {
      _id
      email
      password
      hp
      rating
      quota
      status
    }
  }
}
`

function Transaction(props) {
  const FETCH_PRODUCTS = gql`
    query {
      products {
        _id
        title
        description
        bidProductId {
          _id
          userId
        }
        status
        value
        userId
        photo
        category
        finalBidderId {
          _id 
          email 
          password 
          hp  
          rating 
          quota 
          status 
        }
        finalBidderRating
      }
    }
  `;
  const { navigation } = props;
  const [visible, setVisible] = useState(false)
  const [productDetail, setProductDetail] = useState(null);
  const [userId, setUserId] = useState("");
  const { loading, error, data, refetch } = useQuery(FETCH_PRODUCTS);
  const [Update_rating] = useMutation(UPDATE_RATING)
  const fetchHooks = async () => {
    try {
      let value = await AsyncStorage.getItem("userLogin");
      value = JSON.parse(value);
      let userId = value.userId;
      setUserId(userId);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchHooks();
    refetch()
  }, []);

  console.log("ini userId: ", userId);
  const filter = (data) => {
    let MyBidProd = [];
    data.forEach((el) => {
      setMyBidProd(MyBidProd);
    });
  };

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [bidder, setBidder] = useState('')
  const rate = () => {
    let inputRate;
    if (selectedIndex === 0) {
      inputRate = 1
    } else if (selectedIndex === 1) {
      inputRate = 2
    } else if (selectedIndex === 2) {
      inputRate = 3
    } else if (selectedIndex === 3) {
      inputRate = 4
    } else if (selectedIndex === 4) {
      inputRate = 5
    }
    Update_rating({ variables: {FinalBidderId: bidder.userId, FinalBidderRating: inputRate }})
    setVisible(false)
  }
  const handleFromChild = (data) => {
    setBidder(data)
    setVisible(true)
  };

  if (loading) {
    return (
      <Layout style={styles.containerSpinner}>
        <Spinner />
      </Layout>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.containerone}>
            <TouchableOpacity onPress={() => navigation.navigate("auth")}>
              <ImageBackground
                source={require("../assets/logo.png")}
                style={styles.imgBackgroundHome}
              ></ImageBackground>
            </TouchableOpacity>
            {/* <Text style={{fontSize: 30, fontWeight: 'bold'}}>BarterYuk</Text> */}
          </View>
          <Button
            size="tiny"
            style={{
              borderRadius: 50,
              top: 40,
              right: 10,
              position: "absolute",
              backgroundColor: "#02C39A",
              borderWidth: 0,
            }}
            onPress={() => props.navigation.openDrawer()}
          >
            <FontAwesome5 name="bars" size={24} color="white" />
          </Button>
          <View style={styles.containertwo}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 40,
                paddingBottom: 100,
              }}
            >
              <CarouselFinalBid products={data.products} navigation={navigation} userId={userId} cb={handleFromChild}/>
              {/* <ScrollView>
                <MyBidProducts
                  navigation={props.navigation}
                  products={data.products}
                  userId={userId}
                  cb={handleFromChild}
                />
              </ScrollView> */}
            </View>
          </View>
        </View>
        <Layout style={styles.containerModal} level='1'>
            <Modal visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
              <Card disabled={true}>
                <Text category='h5' style={{color: 'black', marginTop: 20 }}>
                  Rate User
                </Text>
                <RadioGroup
                  style={{flexDirection: 'row', marginBottom: 20}}
                  selectedIndex={selectedIndex}
                  onChange={index => setSelectedIndex(index)}>
                  <Radio style={{color: 'white', marginHorizontal: 8}}>1</Radio>
                  <Radio style={{color: 'white', marginHorizontal: 8}}>2</Radio>
                  <Radio style={{color: 'white', marginHorizontal: 8}}>3</Radio>
                  <Radio style={{color: 'white', marginHorizontal: 8}}>4</Radio>
                  <Radio style={{color: 'white', marginHorizontal: 8}}>5</Radio>
                </RadioGroup>
                <Button onPress={() => rate()}>
                  Submit
                </Button>
              </Card>
            </Modal>
          </Layout>
      </>
    );
  }
}
const styles = StyleSheet.create({
  containerModal: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: "#02C39A",
    paddingTop: 20,
  },
  imgBackgroundHome: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: "cover",
    marginVertical: 20,
    justifyContent: "center",
  },
  containerone: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containertwo: {
    flex: 7,
    backgroundColor: "white",
    // backgroundColor: '#DCDECE',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  containerSpinner: {
    marginTop: 10,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default Transaction;