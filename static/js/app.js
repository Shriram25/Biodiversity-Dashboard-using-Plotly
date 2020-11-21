//working
// create function to pull data for plots
function plotData(id) {
    // read in json data file
    d3.json("static/js/samples.json").then((data)=> {
        console.log(data);
        
          //pull data I need and assign to variables
          //wash frequency
          var wfreq = data.metadata.map(d => d.wfreq);
          console.log(`Washing Freq: ${wfreq}`);
          // create samples variable and filter by id
          var samples = data.samples.filter(s => s.id.toString() === id)[0];
          console.log(samples);
          // get the top 10 otu_labels for the plot
          var labels = samples.otu_labels.slice(0, 10);
                  // pull the top 10 sample values
          var samplevalues = samples.sample_values.slice(0, 10).reverse();
              console.log(samplevalues);
          // get the top 10 otu ids for bar chart in decsending order. 
          var top_OTU = (samples.otu_ids.slice(0, 10)).reverse();
          var OTU_id = top_OTU.map(d => "OTU " + d);
        //bar chart
        // create trace variable for bar chart 
        // create trace variable for the plot
        var trace1 = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };
        // create data variable for bar chart
        var Bardata = [trace1];
        // create layout for the bar chart
        var Barlayout = {
            yaxis:{
                tickmode:"linear",
            },
        };
        // create the bar chart
        Plotly.newPlot("bar", Bardata, Barlayout);
        // The bubble chart
        // create the trace for the bubble chart 
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };
        // create the data variable for bubble plot
        var Bubbledata = [trace2];
        // create the layout for bubble plot
        var Bubblelayout = {
            xaxis:{title: "OTU ID"},
        };
        // create the bubble chart
        Plotly.newPlot("bubble", Bubbledata, Bubblelayout); 
      });
    }  
  // create a function to get the meta data
  // exercise 2 day 3
  function getData(id) {
      // read the json file to get data
      d3.json("static/js/samples.json").then((data)=> {
          // pull metadata for demographics
          var metadata = data.metadata;
          console.log(metadata);
          // filter the meta data by id
          var results = metadata.filter(meta => meta.id.toString() === id)[0];
          // create demographics var to insert data
          var demographics = d3.select("#sample-metadata");
          // clear the demographics for each search
          demographics.html("");
          // input the data based on id, and append the info to the demographics chart
          Object.entries(results).forEach((key) => {   
                  demographics.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
          });
      });
  }
  // create the function for the change event
  function optionChanged(id) {
      plotData(id);
      getData(id);
  }
  // create a function on the event change
  function init() {
      // create the dropdown menu
      // exercise 4 day 3
      var dropdown = d3.select("#selDataset");
      // read in data 
      d3.json("static/js/samples.json").then((data)=> {
          console.log(data);
          // append the id names to the dropdwown menu 
          data.names.forEach(function(name) {
              dropdown.append("option").text(name).property("value");
          });
          // call the functions to display the data and the plots
          plotData(data.names[0]);
          getData(data.names[0]);
      });
    }
    init();