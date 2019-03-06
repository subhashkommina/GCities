import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Button, View,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,FlatList,ImageBackground} from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import ListPopover from 'react-native-list-popover';

import DropdownMenu from 'react-native-dropdown-menu';

import img from './b.jpg';

import { Dropdown } from 'react-native-material-dropdown';

import CardView from 'react-native-cardview'




export default class App extends Component {

  constructor(props){
    super(props);
    this.cityn='';
    this.catname='';
    this.secname='';
    this.i='';
    this.k='';
    this.id='';
    this.itemh=[],
    this.state={
      showSections: false,
      showSecDetail: false,
      listshow:false,
      showCat:false,
      data:[],
      list:[], 
      listmore:[],
      num:0,
    };
  }
  componentDidMount() {
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/')
    .then(res=> res.json())
    .then(res=> {
       this.setState({
         data:res
       })     
      })
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/Tadepalligudem/Health/Hospitals/entry')
    .then(res => res.json())
    .then(res => {
      this.setState({
        list:res
      })
    })


  }

  
   city =(item,index) =>{
     
    this.cityn=item.city;
    this.catname='';
    this.secname='';
    
    this.setState({showSections:false});
    this.setState({showSecDetail:false});
    if(this.state.showCat === true)
    {
      this.setState({showCat:false});
    }
    else{
      this.setState({showCat:true});
    }
    
   }

   cat=(item,index)=>{
     this.catname=item.category;
     this.secname='';

     this.setState({showSecDetail:false});
     if(this.state.showSections === true)
     {
       this.setState({showSections:false});
     }
     else{
       this.setState({showSections:true});
     }
   }
   
   secDetails=(item,index)=>{
    this.secname=item.name;
    if(this.state.showSecDetail === true)
    {
      this.setState({showSecDetail:false});
    }
    else{
      this.setState({showSecDetail:true});
    }
  }

  secMoreDetails=(item,index)=>{
    this.id=item.id;
    fetch('https://4r5qkqzk35.execute-api.us-east-1.amazonaws.com/v1/activecities/Tadepalligudem/Health/Hospitals/entry/'+this.id)
    .then(res => res.json())
    .then(res => {
      this.setState({
        listmore:res
      })
    })
  }

  render()
   {
    return (
     
 <View>
<ImageBackground style={{height: 200,justifyContent:"center",alignItems:"center" }} source={img}><Text style={{color:"white",fontSize:40}}>Glarimy Cities</Text></ImageBackground>
     
<View style={{height:80,padding:10  }}>
<FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
    //console.log(item);
     if(item.category === "Default")
     {
      return <View style={{backgroundColor:"#696969",height:70,width:500}}>
      <TouchableOpacity 
      onPress={()=>this.city(item,index)}>
     <CardView
         cardElevation={2}
         cardMaxElevation={2}
         cornerRadius={5}>
        <Text style={{fontSize:24,marginLeft:170,padding:20}}>{item.citydisplay}</Text>
        <Text>{item.citydisplay}</Text>
     
          </CardView>
          </TouchableOpacity>
   </View>
     }
  }
     }
  />
   </View> 


   {(!this.state.showCat) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
    //console.log(this.cityn);
    if(item.city === this.cityn && item.category != "Default" )
    { 
      this.setState({showCat:true});
      return
    }
  }
}
  />}


   
   {(this.state.showCat) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{
    //console.log(this.cityn);
    //console.log(item);
    if(item.city === this.cityn && item.category != "Default" )
    { 
      
      return <View style={{padding:10,flex:1}}>
      <TouchableOpacity 
      onPress={()=>this.cat(item,index)}>
     <CardView
         cardElevation={2}
         cardMaxElevation={2}
         height={50}
         cornerRadius={5}>
        <Text style={{fontSize:18,padding:15}}>{item.categorydisplay}</Text>
          </CardView>
          </TouchableOpacity>
   </View>
        

      
    }
  
  }

}
  />}

{(!this.state.showSections) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{

    if(item.category === this.catname && item.city === this.cityn )
    {
       
      this.setState({showSections:true});
      return
    }
  }

}
  />}



{(this.state.showSections) &&  <FlatList
  
  data={this.state.data}
  
  renderItem={({item},index) =>{

    if(item.category === this.catname  && item.city === this.cityn  )
    {
      var d= item.sections;    
        
      return <FlatList
    horizontal
  data={d}
  renderItem={({item},index) =>{
    
     return  <View style={{padding:10,flexDirection:"row"}}>
     <TouchableOpacity 
      onPress={()=>this.secDetails(item,index)}>
    <CardView
        cardElevation={2}
        cardMaxElevation={2}
        height={50}
        cornerRadius={5}>
       <Text style={{fontSize:18,padding:15}}>{item.display}</Text>
         </CardView></TouchableOpacity>
  </View>
   
  }

}
  />
    }
    }
  }
  />}


{(!this.state.showSecDetail) &&  <FlatList
  horizontal
  data={this.state.data}
  renderItem={({item},index) =>{

    if(item.category === this.catname && item.city === this.cityn && item.name === this.secname)
    {
       
      this.setState({showSections:true});
      return
    }
  }

}
  />}



{(this.state.showSecDetail) &&  <FlatList
  
  data={this.state.list}
  
  renderItem={({item},index) =>{

    if(item.category === this.catname  && item.city === this.cityn && item.section === this.secname )
    {
      
     return  <View style={{padding:10,flexDirection:"row"}}>
     <CardView
        cardElevation={2}
        cardMaxElevation={2}
        height={180}
        width={500}
        cornerRadius={5}>
       <Text style={{fontSize:20,padding:15}}>{item.name}</Text>
       <Text style={{fontSize:13,padding:15,fontStyle:"italic"}}>{item.address}</Text>
       <TouchableOpacity 
      onPress={()=>this.secMoreDetails(item,index)}>
       <Text style={{textAlign:"center"}}>more</Text>
       </TouchableOpacity>
         </CardView>
        
  </View>
   
  
    }
    }
  }
  />}



</View>
  );
  
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


