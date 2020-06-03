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
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import BNIBProducts from "../components/HomeComponents/BNIB";
import BNOBProducts from "../components/HomeComponents/BNOB";
import UsedProducts from "../components/HomeComponents/Used";
import SlidingUpPanel from "rn-sliding-up-panel";
import Sliding from "../components/HomeSlider";
const { height, width } = Dimensions.get("window");

const FETCH_PRODUCTS = gql`
  query {
    products {
      _id
      title
      description
      bidProductId {
        _id
      }
      value
      userId
      photo
      category
    }
  }
`;
// const FETCH_PRODUCTS= gql`
//       query user($email: String!) {
//         user(email:$email) {
//           status
//           message
//           user {
//             _id
//             email
//             password
//             hp
//             rating
//             quota
//             status
//           }
//         }
//       }
//   `;

function Home(props) {
  const { navigation } = props;
  const [productDetail, setProductDetail] = useState(null);
  // const [loading, setLoading] = useState(false)

  const { loading, error, data } = useQuery(FETCH_PRODUCTS);

  // const [visible, setVisible] = useState(false)
  // const [payload, setPayload] = useState('')

  // useEffect(() => {
  //   if (props.route.params) {
  //     console.log('params route', props.route.params)
  //     setVisible(true)
  //     setPayload(props.route.params.payload)
  //     props.route.params = null
  //   }
  // }, [props.route.params])
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       setVisible(false)
  //     };
  //   }, [])
  // );

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem("userLogin");
      value = JSON.parse(value);
      console.log("tokeeen", value);
      if (value) {
        navigation.navigate("root");
      } else {
        console.log("masuuuuk home, token should be null");
        // axios.get('http://192.168.0.104:3000/products')
        // .then(({ data }) => {
        //   // console.log(data)
        //   let BNIBProd = []
        //   let BNOBProd = []
        //   let UsedProd = []
        //   data.forEach(el => {
        //     if (el.category === 'BNIB' ) {
        //       BNIBProd.push(el)
        //     } else if (el.category === 'BNOB') {
        //       BNOBProd.push(el)
        //     } else {
        //       UsedProd.push(el)
        //     }
        //   })
        //   setBNIBProd(BNIBProd)
        //   setBNOBProd(BNOBProd)
        //   setUsedProd(UsedProd)
        //   setLoading(false)
        // })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFromChild = (data) => {
    setProductDetail(data);
  };

  const filter = (data) => {
    let BNIBProd = [];
    let BNOBProd = [];
    let UsedProd = [];
    data.forEach((el) => {
      if (el.category === "BNIB") {
        BNIBProd.push(el);
      } else if (el.category === "BNOB") {
        BNOBProd.push(el);
      } else {
        UsedProd.push(el);
      }
    });
    setBNIBProd(BNIBProd);
    setBNOBProd(BNOBProd);
    setUsedProd(UsedProd);
  };
  const draggedValue = new Animated.Value(120);
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
              <ScrollView>
                <BNIBProducts
                  navigation={props.navigation}
                  products={data.products}
                  cb={handleFromChild}
                />
                <BNOBProducts
                  navigation={props.navigation}
                  products={data.products}
                  cb={handleFromChild}
                />
                <UsedProducts
                  navigation={props.navigation}
                  products={data.products}
                  cb={handleFromChild}
                />
              </ScrollView>
            </View>
          </View>
          <SlidingUpPanel
            showBackdrop={false}
            draggableRange={{ top: height - 60, bottom: 20 }}
            animatedValue={draggedValue}
          >
            <View style={styles.panel}>
              {productDetail !== null ? (
                <Sliding
                  data={productDetail}
                  status={"homeProduct"}
                  navigation={navigation}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Click the Product to see its detail
                </Text>
              )}
            </View>
          </SlidingUpPanel>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02c39a",
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
    // backgroundColor: '#dcdece',
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
    backgroundColor: "#02c39a",
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
export default Home;
