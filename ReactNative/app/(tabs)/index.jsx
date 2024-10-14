import { Image, Platform, Pressable, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [tvTop, setTvTop] = useState([]);

  const Detalhes = ({ route, navigation }) => {}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/popular",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setSeries(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/top_rated",
          {
            params: {
              api_key: "e6e7ec51c94f1b387d581a393008e486",
            },
          }
        );
        setTvTop(response.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerHeight={500}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/john-wick.jpg")}
          style={styles.mainImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <Pressable style={styles.buttone}>
          <ThemedText>Play</ThemedText>
        </Pressable>
        <Pressable style={styles.buttwo}>
          <ThemedText>Details</ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Trending Now</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedView style={styles.movieList}>
          {movies.map((movie) => (
            <ThemedView key={movie.id}>
              <ThemedText>{movie.title}</ThemedText>
              <Image
                style={styles.image}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
              />
            </ThemedView>
          ))}
        </ThemedView>
        
        <ThemedText type="subtitle">Series</ThemedText>

        <ThemedView style={styles.tvList}>
          {series.map((tv) => (
            <ThemedView key={tv.id}>
              <ThemedText>{tv.name}</ThemedText>
              <Image
                style={styles.image}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
                }}
              />
            </ThemedView>
          ))}


        </ThemedView>

          

        <ThemedView style={styles.tvList}>
          {tvTop.map((tv) => (
            <ThemedView key={tv.id}>
              <ThemedText>{tv.name}</ThemedText>
              <Image
                style={styles.image}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
                }}
              />
            </ThemedView>
          ))}

          
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  mainImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttone: {
    backgroundColor: "#545454",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
  },
  buttwo: {
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 8,
  },
  movieList: {
    flexDirection: "row",
    gap: 8,
    overflow: "auto",
  },
  tvList: {
    flexDirection: "row",
    gap: 8,
    overflow: "auto",
  },
});