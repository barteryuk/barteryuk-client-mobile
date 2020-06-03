import React, { useEffect, useState } from "react";
// import { useQuery } from '@apollo/react-hooks';
import Carousel from "./ProductsByCategory/Carousel";
import TagCategory from "./ProductsByCategory/TagCategory";
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { StyleSheet, AsyncStorage } from "react-native";



function MyFinalBid(props) {
  const { navigation, products, userId } = props;
  const [MyBidProd, setMyBidProd] = useState(null);
  // const { loading, error, data } = useQuery(FETCH_MOVIES)
  //   if (error) return <Layout style={styles.containerSpinner}><Text>Error ...</Text></Layout>
  const handleFromChild = (data) => {
    props.cb(data);
  };

  
  useEffect(() => {
    let payload = []
    products.forEach(el => {
      // console.log('ELLLLL', el)
      if (el.finalBidderId.length !== 0) {
        console.log('BIDDER FINAL ID =========', el.finalBidderId[0]._id)
        if (el.finalBidderId[0]._id === userId ) {
          payload.push(el)
        } 
      }
    })
    setMyBidProd(payload)
  }, [])

  // useEffect(() => {
  //   fetchHooks();
  let MyNewBidProd = [];
  
  // console.log("ini products ===", products);
  
  // const acceptedBid = products.filter(
  //   (el) => el.finalBidderId[0].userId === userId
  // );
  console.log("ini dari components userId ============== ", userId);
  // console.log("accepted bid is: ", acceptedBid);
  // console.log("myNewBidProd is: ", MyNewBidProd);
  // setMyBidProd(MyBidProd);
  // }, []);
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