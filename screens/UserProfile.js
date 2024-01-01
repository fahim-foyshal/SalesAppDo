import React from 'react';
import { View, Image, StyleSheet,ScrollView,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const user = useSelector((state) => state.useralldetails.userData);
  const routes = useSelector(state => state.routedetails.routeData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: user.user_image,
          }}
        />
      </View>
     
      <ScrollView className=" w-[90%] rounded-md m-3">
        <View className="bg-white rounded-md w-[] h-36 m-3" style={{elevation:8}}>
                <Text className="text-center text-[#ff8f9c] m-2 font-extrabold" >Personal Information</Text>
                <Text className="m-2 font-extrabold">  <Text className=" text-[#ff8f9c] " >Personal Information :</Text> <Text> {user.full_name}</Text></Text>
                <Text className="m-2 font-extrabold">  <Text className=" text-[#ff8f9c] " >Mobile NO :</Text> <Text> {user.mobile}</Text></Text>
                <Text className="m-2 font-extrabold">  <Text className=" text-[#ff8f9c] " >Dealer NO :</Text> <Text> {user.dealer_code}</Text></Text>
       
        </View>
        <View className="bg-white rounded-md w-[] m-3 h-36" style={{elevation:8}}>
                <Text className="text-center text-[#ff8f9c] m-2 font-extrabold" >Area Information</Text>
                <Text className="m-2 font-extrabold">  <Text className=" text-[#ff8f9c] " >Area Name :</Text> <Text> {user.area_name}</Text></Text>
                <Text className="m-2 font-extrabold">  <Text className=" text-[#ff8f9c] " >Zone Name :</Text> <Text> {user.zone_name}</Text></Text>
                <Text className="m-2 font-extrabold">  <Text className=" text-[#ff8f9c] " >Region Name :</Text> <Text> {user.region_name}</Text></Text>
       
        </View>
        <View className="bg-white rounded-md w-[] m-3" style={{elevation:8}}>

                <Text className="text-center text-[#ff8f9c] m-2 font-extrabold" >Routes List</Text>
                <View  className="flex flex-row flex-wrap">
                {routes.map((route, index) => (
              <View className="p-2 rounded-md bg-[#ff8f9c] m-1" key={index} style={styles.routeCard}>
                <Text className="text-white font-extrabold">{route.route_name}</Text>
                {/* Add more details from the route object as needed */}
              </View>
            ))}
                </View>
                 
       
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    elevation:8,
    // justifyContent: 'center',
  },
  imageContainer: {
    width: 300,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden', // Ensure the image is clipped to the rounded corners
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default UserProfile;
