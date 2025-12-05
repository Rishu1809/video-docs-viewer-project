
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK_VIDEOS = [
  {
    id: 'vid-1',
    title: 'React Native FlatList Basics',
    thumbnail: 'https://i.ytimg.com/vi/5VbAwhBBHsg/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=5VbAwhBBHsg',
  },
  {
    id: 'vid-2',
    title: 'Firebase Auth in RN',
    thumbnail: 'https://i.ytimg.com/vi/zQyrwxMPm88/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=zQyrwxMPm88',
  },
  {
    id: 'vid-3',
    title: 'Navigation Stack vs Tabs',
    thumbnail: 'https://i.ytimg.com/vi/WzQnPN8fTnQ/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=WzQnPN8fTnQ',
  },
];


const DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Project Requirements.pdf',
    type: 'pdf',
    size: '1.2 MB',
    url: 'https://example.com/files/requirements.pdf',
  },
  {
    id: 'doc-2',
    name: 'API Spec.docx',
    type: 'docx',
    size: '850 KB',
    url: 'https://example.com/files/api-spec.docx',
  },
  
{
    id: 'doc-3',
    name: 'Release Notes.md',
    type: 'md',
    size: '54 KB',
    url: 'https://example.com/files/release-notes.md',
  },

]

export default function Home() {
    const navigation = useNavigation();
  const renderItem = ({ item }) => (
    // <TouchableOpacity style={styles.card} onPress={() => { /* open item.url */ }}>
    <View style={styles.card}>
        { console.log('Home screen rendered', item.thumbnail)}
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
     {/* </TouchableOpacity> */}
    </View>
  );

  
const renderDocumentItem = ({ item }) => (
    // <TouchableOpacity style={styles.card}
    // //  onPress={() => openUrl(item.url)}
    //  >
    <View style={styles.card}>
      <View style={styles.docIcon}>
        <Text style={styles.docIconText}>
          {/* {item.type.toUpperCase().slice(0, 3)} */}
          {item.type}
        </Text>
      </View>
      <View style={styles.docMeta}>
        <Text style={styles.docName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.docSub}>{item.size}</Text>
      </View>
    {/* </TouchableOpacity> */}
    </View>
  );


  return (
    <View style={styles.container}>
        <Text style={styles.sectionTitle}>Hello Rishu</Text>

 <View style={styles.header}>
        <Text style={styles.sectionTitle}>Videos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Video')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

        <View>
      <FlatList
        data={MOCK_VIDEOS}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      </View>

       <View style={styles.header}>
        <Text style={styles.sectionTitle}>Documents</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Document')}>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

        <View style={{marginBottom:20}}>
      <FlatList
        data={DOCUMENTS}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={renderDocumentItem}
        contentContainerStyle={styles.listContent}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 16, 
    paddingHorizontal: 16 
},
  header: {
     flexDirection: 'row', 
     alignSelf: 'stretch',
      alignItems: 'center',
       justifyContent: 'space-between',
       marginTop:30
     }, 
  listContent: {
     paddingRight: 12,
     },
  card: { 
    width: 180, 
    alignItems:'center',
    borderColor:'gray',
    borderWidth:2,
    borderRadius:10,
    margin:5,
     height: 140,
},
  thumb: {
     width: '100%', 
     height: 100,
      borderRadius: 10,
       backgroundColor: '#eee' },
  title: {
     fontSize: 12,
      color: '#333', 
      marginTop: 6 
    },
    
sectionTitle: { 
    fontSize: 16,
     fontWeight: '600',
      color: '#222' 
},
  viewAll: { 
    fontSize: 13,
     color: '#3b82f6', 
     fontWeight: '600' 
}

});
