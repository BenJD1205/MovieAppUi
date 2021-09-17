import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'

import {ProgressBar} from '../components';

import {COLORS, SIZES, FONTS, icons} from '../constants'

const MovieDetail = ({navigation,route}) => {

    const [selectedMovie, setSelectedMoview] = React.useState(null)

    React.useEffect(() => {
        let {selectedMovie} = route.params;
        setSelectedMoview(selectedMovie)
    }, [])


    function renderHeaderBar() {
        return(
            <View
                style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: Platform === 'ios' ? 40: 20,
                    paddingHorizontal:SIZES.padding
                }}
            >
                {/*Back */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:50,
                        height: 50,
                        borderRadius:20,
                        backgroundColor:COLORS.transparentBlack
                    }}
                    onPress={() =>navigation.goBack()}
                >
                    <Image 
                        source={icons.left_arrow}
                        resizeMode="contain"
                        style={{
                            width:20,
                            height:20,
                            tintColor:COLORS.white
                        }}
                    />
                </TouchableOpacity>
                {/*Share */}
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:50,
                        height: 50,
                        borderRadius:20,
                        backgroundColor:COLORS.transparentBlack
                    }}
                    onPress={() =>console.log("Share")}
                >
                    <Image 
                        source={icons.upload}
                        resizeMode="contain"
                        style={{
                            width:20,
                            height:20,
                            tintColor:COLORS.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeaderSection() {
        return(
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    width:'100%',
                    height:SIZES.height < 700 ? SIZES.height : SIZES.height *0.7
                }}
            >
                <View
                    style={{
                        flex:1
                    }}
                >
                    {renderHeaderBar()}

                    <View
                        style={{
                            flex:1,
                            justifyContent: 'flex-end'
                        }}
                    >
                        <LinearGradient
                            start={{x:0,y:0}}
                            end={{x:0,y:1}}
                            colors={['transparent', '#000']} 
                            style={{
                                width:'100%',
                                height:150,
                                alignItems: 'center',
                                justifyContent:'flex-end'
                            }}
                        >
                            {/*Season */}
                            <Text
                                style={{
                                    color:COLORS.white,
                                    ...FONTS.h4
                                }}
                            >
                                {selectedMovie?.details?.season}
                            </Text>

                            {/*Name */}
                            <Text
                                style={{
                                    color:COLORS.white,
                                    ...FONTS.h1
                                }}
                            >
                                {selectedMovie?.name}
                            </Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderCategoryAndRating(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems: 'center',
                    marginTop:SIZES.base
                }}
            >
                {/*Age */}
                <View
                    style={[styles.categoryContainer],{
                        marginLeft:0
                    }}
                >
                    <Text style={{color:COLORS.white,...FONTS.h4}}>
                        {selectedMovie?.details?.age}
                    </Text>
                </View>
                {/*Gerne */}
                <View
                    style={[styles.categoryContainer],{
                        paddingHorizontal:SIZES.padding
                    }}
                >
                    <Text style={{color:COLORS.white,...FONTS.h4}}>
                        {selectedMovie?.details?.genre}
                    </Text>
                </View>

                {/*Rattings */}
                <View
                    style={styles.categoryContainer} 
                >
                    <Image 
                        source={icons.star}
                        resizeMode="contain"
                        style={{
                            width:15,
                            height:15
                        }}
                    />

                    <Text style={{marginLeft:SIZES.base,color:COLORS.white,...FONTS.h4}}>
                        {selectedMovie?.details?.ratings}
                    </Text>
                </View>
            </View>
        )
    }

    function renderMovieDetails() {
        return(
            <View
                style={{
                    flex:1,
                    paddingHorizontal:SIZES.padding,
                    marginTop:SIZES.padding,
                    justifyContent: 'space-around'
                }}
            >
                {/* Title, running time and progress bar */}
                <View>
                    {/* Title, running time */}
                    <View
                        style={{
                            flexDirection:'row',
                        }}
                    >
                        <Text
                            style={{
                                flex:1,
                                color:COLORS.white,
                                ...FONTS.h4
                            }}
                        >
                            {selectedMovie?.details?.currentEpisode}
                        </Text>
                        <Text
                            style={{
                                color:COLORS.lightGray,
                                ...FONTS.body4
                            }}
                        >
                            {selectedMovie?.details?.runningTime}
                        </Text>
                    </View>
                    <ProgressBar 
                        containerStyle={{
                            marginTop:SIZES.radius
                        }}
                        barStyle={{
                            height:5,
                            borderRadius:3
                        }}
                        barPercentage={selectedMovie?.details?.progress}
                    />
                </View>
                {/*Watch */}
                <TouchableOpacity
                    style={{
                        height:60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom:Platform.OS === 'ios' ? SIZES.padding *2 : 0,
                        borderRadius:15,
                        backgroundColor:COLORS.primary
                    }}
                >
                    <Text style={{color:COLORS.white,...FONTS.h2}}>
                        {selectedMovie?.details?.progress == "0%" ? "Watch now" : 
                        "Continue watching"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flex:1,
                backgroundColor:COLORS.black
            }}
            style={{backgroundColor:COLORS.black}}
        >
            {/*Header */}
            {renderHeaderSection()}
            {/*Category & Rating */}
            {renderCategoryAndRating()}

            {/*Movie Details */}
            {renderMovieDetails()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoryContainer:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:SIZES.base,
        paddingHorizontal:SIZES.base,
        paddingVertical:3,
        borderRadius:SIZES.base,
        backgroundColor:COLORS.transparentWhite
    }
})

export default MovieDetail;