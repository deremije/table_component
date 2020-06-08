## TableComponent 
    
A React reusable table component with sortable columns, lazy loaded data, and resizable columns.

```
<TableComponent 
    headers={["name", "email", "website"]},
    data={[
        {
            name: "Jeremy Randall",
            email: "jeremy@deremije.com",
            website: "https://www.jeremyrandall.dev",
            photo: "https://www.jeremyrandall.dev/images/jeremy.png",
            id: 1
        }
    ]},
    includePhoto='name'
    sortBy='email'
    pixelBuffer={10}
    chunkSize={1}
    originalLines={4}
    columnWidth={200}
    clickFunction={(obj) => console.log(obj)} />
```

### Props: 
```
    headers: Array of Strings
        column headers, which are also the keys for values to display in table in the data prop

    data: Array of Objects
      {
            header: value,
            ... ,
            id: idValue (REQUIRED)
      }

    sortBy: String 
        (OPTIONAL) - indicates the column header by which to sort at load. if omitted, columns will be unsorted by default

    includePhoto: String 
        (OPTIONAL) - if included, when a column is rendered with the matching header, an image will be rendered inline with the src set to the value included under the 'photo' key  

    pixelBuffer: Number 
        (OPTIONAL) - if included, will override the number of pixels watched for in order to load another data chunk.  default is 200

    chunkSize: Number 
        (OPTIONAL) - if included, will override the number of data lines to render at load and to add when user has scrolled into the pixelBuffer.  default is 10.

    originalLines: Number 
        (OPTIONAL) - if included, will override the number of data  lines to render at load set either by default (40) or by the chunkSize prop

    columnWidth: Number
        (OPTIONAL) - if included, will set all table columns to be the same static width.  denotes the number of pixels

    clickFunction: Function
        (OPTIONAL) - if included, will set an onClick function for each row in the table, and pass in the object used to populate the row as its parameter
```

### Styles 
Styles can be updated easily in CSS.  All classes besides "tableComponent" begin with "tC-".  The only inline style that will be difficult to override is for the sorting caret indicator.

### Dependencies
```
    "re-resizable": "^6.4.0",
```


Please direct all questions to Jeremy Randall - jeremy@deremije.com



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

