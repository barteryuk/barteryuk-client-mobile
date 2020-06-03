import React, { useEffect, useState } from "react";
// import { useQuery } from '@apollo/react-hooks';
import Carousel from "./ProductsByCategory/Carousel";
import TagCategory from "./ProductsByCategory/TagCategory";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { StyleSheet, AsyncStorage } from "react-native";



function MyFinalBid(props) {
  const { navigation, products, userId } = props;
  const [MyBidProd, setMyBidProd] = useState(null);
  const handleFromChild = (data) => {
    props.cb(data);
  };

  useEffect(() => {
    let payload = []
    products.forEach(el => {
      if (el.finalBidderId.length !== 0) {
        console.log('BIDDER FINAL ID =========', el.finalBidderId[0]._id)
        if (el.finalBidderId[0]._id === userId ) {
          payload.push(el)
        } 
      }
    })
    setMyBidProd(payload)
  }, [])
  let MyNewBidProd = [];
  console.log("ini dari components userId ============== ", userId);
  return (
    <>
      <TagCategory category={"My Finished Transactions"} />
      {MyBidProd ? (
        <Carousel
          data={MyBidProd}
          navigation={navigation}
          cb={handleFromChild}
        />
      ) : (
        <Text>Empty</Text>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  containerSpinner: {
    marginTop: 10,
    height: 380,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
export default MyFinalBid;