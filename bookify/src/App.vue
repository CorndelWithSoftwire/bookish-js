<template>
  <v-app>
    <v-app-bar app color="teal lighten-1" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="teal lighten-5">
      <v-container>
        <v-row>
          <v-col cols="5" >
            
              <v-data-table 
                :headers="headers"
                :items="bookList"
                item-key="id"
                :items-per-page="5"
                class="rounded-xl "
                
              ></v-data-table>
            
          </v-col>


          <v-col>
            <v-sheet min-height="70vh" rounded="xl">
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>


<script>


export default {
  name: "App",

  components: {},

  data: () => ({
      headers: [
          {
            text: 'Author',
            align: 'start',
            sortable: true,
            value: 'author',
          },
          { text: 'Title', value: 'title', sortable: false }
        ],
      bookList : mockData
  }),
};

let mockData = [
    {
        "id": 1,
        "title": "The New Manager's Handbook",
        "author": "Morey Stettner ",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 2,
        "title": "Fun with Advanced Mathematics",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 3,
        "title": "Fun with Further Mathematics",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 4,
        "title": "Learn how to be a Demolition Expert",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 5,
        "title": "Learn how to be a Dolphin Trainer",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 6,
        "title": "Learn how to be an Astronaut",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 7,
        "title": "Learn how to be a Supermodel",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 8,
        "title": "Serious Mathematics",
        "author": "Lewis Galoo",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 9,
        "title": "The Elements of Style",
        "author": "William Strunk Jr.,  E. B. White,  William Strunk",
        "isbn": "020530902X    ",
        "copies": 0
    },
    {
        "id": 10,
        "title": "Selenium Simplified - Automated Web Testing with Java and Selenium RC 2nd edition",
        "author": "Alan Richardson",
        "isbn": "956733239     ",
        "copies": 0
    },
    {
        "id": 11,
        "title": "Selenium Simplified - Automated Web Testing with Java and Selenium RC",
        "author": "Alan Richardson",
        "isbn": "956733239     ",
        "copies": 0
    },
    {
        "id": 12,
        "title": "Software Testing:  An ISEB Foundation",
        "author": "Brian Hambling, Peter Morgan, Angelina Samaroo, Geoff Thompson, Peter Williams",
        "isbn": "1906124760    ",
        "copies": 0
    },
    {
        "id": 13,
        "title": "Beginning Android 4 Games Development",
        "author": "Mario Zechner, Robert Green ",
        "isbn": "1430239875    ",
        "copies": 0
    },
    {
        "id": 14,
        "title": "Pro ASP.NET MVC 4",
        "author": "Adam Freeman",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 15,
        "title": "Build Your Own Database Driven Website Using PHP and MySQL",
        "author": "Kevin Yank ",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 16,
        "title": "Peer Reviews in Software",
        "author": "Karl Wiegers",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 17,
        "title": "Perl in a Nutshell (1st ed)",
        "author": "Ellen Siever, Stephen Spainhour, Nathan Patwardhan",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 18,
        "title": "Effortless Flex 4 Development",
        "author": "Larry Ullman",
        "isbn": "321705947     ",
        "copies": 0
    },
    {
        "id": 19,
        "title": "Growing object-oriented software, guided by tests",
        "author": "Steve Freeman",
        "isbn": "321503627     ",
        "copies": 0
    },
    {
        "id": 20,
        "title": "Data Protection & PCI Compliance for Dummies",
        "author": "Richard Moulds",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 21,
        "title": "Foundations of F# (Expert's Voice in .Net)",
        "author": "Robert. Pickering",
        "isbn": "1590597575    ",
        "copies": 0
    },
    {
        "id": 22,
        "title": "Microsoft Project 2013 ",
        "author": "Ben Howard",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 23,
        "title": "Continuous Delivery",
        "author": "Jez Humble",
        "isbn": "321601912     ",
        "copies": 0
    },
    {
        "id": 24,
        "title": "Agile product management with Scrum",
        "author": "Roman Pichler",
        "isbn": "321605780     ",
        "copies": 0
    },
    {
        "id": 25,
        "title": "Joe Celko's SQL Puzzles and Answers, Second Edition (The Morgan Kaufmann Series in Data Management Systems)",
        "author": "Joe Celko",
        "isbn": "123735963     ",
        "copies": 0
    },
    {
        "id": 26,
        "title": "jQuery cookbook",
        "author": "jQuery Community Experts",
        "isbn": "596159773     ",
        "copies": 0
    },
    {
        "id": 27,
        "title": "Building Web, Cloud, and Mobile Solutions with F#",
        "author": "Daniel Mohl",
        "isbn": "1-4493-3376-1 ",
        "copies": 0
    },
    {
        "id": 28,
        "title": "Special Edition Using Microsoft Commerce Server 2002",
        "author": "Don Jones,  Mark D. Scott",
        "isbn": "789727633     ",
        "copies": 0
    },
    {
        "id": 29,
        "title": "How to Win Friends and Influence People ",
        "author": "Dale Carnegie ",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 30,
        "title": "Purely functional data structures",
        "author": "Chris Okasaki",
        "isbn": "521663504     ",
        "copies": 0
    },
    {
        "id": 31,
        "title": "Bulletproof Web Desig",
        "author": "Dan Cederholm ",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 32,
        "title": "The Big Book of Me",
        "author": "Nina Grunfeld",
        "isbn": "1904977499    ",
        "copies": 0
    },
    {
        "id": 34,
        "title": "Taste Test - Puppet Chef Salt Ansible",
        "author": "Matt Jaynes",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 35,
        "title": "WCF Security Guide",
        "author": "J.D. Meier, Carlos Farre, Jason Taylor, Prashant Bansode, Steve Gregersen, Madhu Sundararajan, Rob Boucher",
        "isbn": "NULL          ",
        "copies": 0
    },
    {
        "id": 36,
        "title": "Professional ASP.NET Design Patterns",
        "author": "Scott Millett",
        "isbn": "470292784     ",
        "copies": 0
    },
    {
        "id": 37,
        "title": "Perl in A Nutshell",
        "author": "Ellen Siever,  Stephen Spainhour,  Nathan Patwardhan",
        "isbn": "596002416     ",
        "copies": 0
    },
    {
        "id": 38,
        "title": "Give and Take",
        "author": "Adam Grant ",
        "isbn": "              ",
        "copies": 0
    },
    {
        "id": 39,
        "title": "Real-World Functional Programming",
        "author": "Tomas Petricek, Jon Skeet",
        "isbn": "1933988924    ",
        "copies": 0
    },
    {
        "id": 40,
        "title": "Domain Driven Design Quickly",
        "author": "Abel Avram , Floyd Marinescu ",
        "isbn": "1411609255    ",
        "copies": 0
    },
    {
        "id": 41,
        "title": "Introducing Microsoft SQL Server 2012 ",
        "author": "Ross Mistry, Stacia Misner",
        "isbn": "073566515X    ",
        "copies": 0
    },
    {
        "id": 42,
        "title": "Working effectively with legacy code",
        "author": "Michael C. Feathers",
        "isbn": "131177052     ",
        "copies": 0
    },
    {
        "id": 44,
        "title": "MCAD Developing and Implementing Web Applications with Microsoft Visual C# .NET and Microsoft Visual Studio  .NET Exam Cram 2 (Exam Cram 70-315)",
        "author": "Priti Kalani",
        "isbn": "789729016     ",
        "copies": 0
    },
    {
        "id": 45,
        "title": "Find Your Dream Job",
        "author": "Sarah Wade",
        "isbn": "1905736479    ",
        "copies": 0
    },
    {
        "id": 46,
        "title": "The Solutions Focus",
        "author": "Paul Z. Jackson,  Mark McKergow",
        "isbn": "1904838065    ",
        "copies": 0
    },
    {
        "id": 47,
        "title": "Beginning ASP.NET 2.0",
        "author": "Chris Hart, John Kauffman, David Sussman, Chris Ullman",
        "isbn": "764588508     ",
        "copies": 0
    },
    {
        "id": 48,
        "title": "Professional ASP.NET MVC 2",
        "author": "Jon Galloway, Phil Haack, Scott Hanselman, Scott Gutherie, Rob Conery",
        "isbn": "470643188     ",
        "copies": 0
    },
    {
        "id": 49,
        "title": "JavaScript Design Patterns",
        "author": "Addy Osmani",
        "isbn": "978-1449331818",
        "copies": 0
    },
    {
        "id": 50,
        "title": "Spring recipes",
        "author": "Gary Mak",
        "isbn": "1590599799    ",
        "copies": 0
    }
];

</script>
