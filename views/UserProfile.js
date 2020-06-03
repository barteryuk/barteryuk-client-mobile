import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Image,
  AsyncStorage,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { Button, Modal, Card, Input } from "@ui-kitten/components";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const FETCH_USER = gql`
  query user($email: String!) {
    user(email: $email) {
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
`;

const CREATE_TOPUP = gql`
  mutation addPayment($email: String!, $topUp: Int!) {
    addPayment(email: $email, topUp: $topUp) {
      status
      message {
        message
      }
      payment {
        id
        email
        topUp
        status
        createdAt
        updatedAt
      }
    }
  }
`;

function Index(props) {
  const { navigation } = props;
  const [email, setEmail] = useState("");
  const { loading, client, data } = useQuery(FETCH_USER, {
    variables: { email: email },
  });

  const [visible, setVisible] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [value, setValue] = useState(0);
  const [createTopUp] = useMutation(CREATE_TOPUP, {});

  const fetchStorage = async () => {
    let value = await AsyncStorage.getItem("userLogin");
    value = JSON.parse(value);
    console.log("value storage form user profile", value);
    setEmail(value.email);
  };
  useEffect(() => {
    fetchStorage();
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem("userLogin");
    await AsyncStorage.removeItem("token");
    client.resetStore();
    navigation.navigate("home");
  };

  // const handleRequestQuota = () => {
  //   console.log("ini created");
  //   setVisible(false);
  //   // createTopUp({
  //   //   variables: { email: email, topUp: 8 },
  //   // });
  // };

  const handleRequestQuota = () => {
    if (value <= data.user.user.quota && Number(value) >= 1) {
      createTopUp({
        variables: { email: email, topUp: Math.floor(Number(value)) },
      });
      console.log("created");
      setVisibleMessage(false);
      setVisible(false);
      setValue(0);
    } else {
      setVisibleMessage(true);
      console.log("TopUp>Quota", typeof data.user.user.quota, typeof value);
    }
  };

  if (loading) {
    return <Text>Loading</Text>;
  } else {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 50,
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#02C39A",
        }}
      >
        <Svg viewBox="0 0 859.43 890.3" style={styles.ellipse}>
          <Ellipse
            strokeWidth={1}
            fill="rgba(255,255,255,1)"
            cx={430}
            cy={530}
            rx={440}
            ry={445}
          ></Ellipse>
        </Svg>
        <View style={{ marginTop: 50, marginBottom: 40 }}>
          <Image
            style={styles.photoProfile}
            source={require("../assets/userProfile.png")}
          ></Image>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "70%" }}
        >
          <MaterialIcons name="email" size={50} color="black" />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 0 }}>
              Email
            </Text>
            <Text style={{ fontSize: 15 }}>{data.user.user.email}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "70%",
            marginTop: 15,
          }}
        >
          <MaterialIcons name="local-phone" size={50} color="black" />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 0 }}>
              Phone Number
            </Text>
            <Text style={{ fontSize: 15 }}>{data.user.user.hp}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "70%",
            marginTop: 15,
          }}
        >
          <MaterialIcons
            name="account-balance-wallet"
            size={50}
            color="black"
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 0 }}>
              Quota
            </Text>
            <Text style={{ fontSize: 15 }}>{data.user.user.quota}</Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}
        >
          <Button
            style={{ borderRadius: 40 }}
            status="success"
            onPress={() => setVisible(true)}
          >
            Request Quota
          </Button>

          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => {
              setVisible(false);
              setVisibleMessage(false);
              setValue(0);
            }}
          >
            <Card disabled={true}>
              <Text>Input Top Up Amount</Text>
              {visibleMessage ? (
                <Text style={{ color: "red" }}>
                  Requested Top Up Must Be More Or Equal To 1, and More Than
                  Quota!!!
                </Text>
              ) : null}
              <Input
                placeholder="number only"
                value={value}
                keyboardType={"numeric"}
                onChangeText={(nextValue) => {
                  if (nextValue >= 1) {
                    setVisibleMessage(false);
                    setValue(nextValue);
                  } else {
                    setValue(0);
                    setVisibleMessage(true);
                  }
                }}
              />
              <Button onPress={handleRequestQuota}>Top Up</Button>
            </Card>
          </Modal>
        </View>
        <View></View>
        <View
          style={{ flex: 1, width: "90%", position: "absolute", bottom: 30 }}
        >
          <Button style={{ borderRadius: 40 }} onPress={() => logout()}>
            LOGOUT
          </Button>
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02C39A",
    width: 360,
    height: 660,
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 859,
    height: 890,
    position: "absolute",
  },
  // ellipseStack: {
  //   height: 890,
  //   marginTop: 43,
  //   marginLeft: -50,
  //   marginRight: -449
  // },
  photoProfile: {
    resizeMode: "contain",
    borderRadius: 50,
    width: 200,
    height: 200,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
export default Index;
