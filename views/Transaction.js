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
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import axios from "axios";
import { Layout, Spinner } from "@ui-kitten/components";
import { Button, Text } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import MyBidProducts from "../components/MyFinalBid";
import CarouselFinalBid from '../components/MyFinalBidCard'
const { height, width } = Dimensions.get("window");

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
  const [productDetail, setProductDetail] = useState(null);
  const [userId, setUserId] = useState("");
  const { loading, error, data, refetch } = useQuery(FETCH_PRODUCTS);
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

  const handleFromChild = (data) => {
    // console.log("ini data dari transaction", data);
    // setProductDetail(data);
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
              <CarouselFinalBid products={data.products} navigation={navigation} userId={userId}/>
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
      </>
    );
  }
}
const styles = StyleSheet.create({
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
    flex: 9,
    backgroundColor: "whitesmoke",
    // backgroundColor: '#DCDECE',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  panel: {
    paddingTop: 50,
    paddingBottom: 150,
    flex: 1,
    // borderWidth: 2,
    // backgroundColor: 'rgba(219, 219, 219, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#02C39A",
    position: "relative",
    height: 100,
    shadowColor: "#555556",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 7,
  },
  containerSpinner: {
    marginTop: 10,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
});
export default Transaction;