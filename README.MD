# **Quiz(os)**

## An open source quiz creator
### If anyone feel, It misses something, feel free to fork and thanks in advance for any contribution.
<br /><br />

| Page/Component/Container |                                      file                                     |                                                      Description                                                   |
|------------------------- | ------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------ |
| App                      |  /src/App.js                                                                  | Starting Component which redirects to Home using Route                                                             |
| Auxiliary                |  /src/hoc/Auxiliary/Auxiliary.js                                              | higher oredr component to help as parent element                                                                   |
| Layout                   |  /src/hoc/Layout/Layout.js                                                    | Common to work as hoc for different routes                                                                         |
| CreateQuiz               |  /src/containers/CreateQuiz/CreateQuiz.js                                     | used for /create-quiz route  [for creating new quizes]                                                             |
| Dashboard                |  /src/containers/Dashboard/Dashboard.js                                       | users can see their taken and created quiz [under route /dashboard]                                                |
| Dashboard                |  /src/containers/Quiz/Quiz.js                                                 | for route /quiz (page for taking quiz)                                                                             |
| Home                     |  /src/containers/Home/Home.js                                                 | Starting Page for both Users and Non-Users using conditional rendering                                             |
| Home                     |  /src/containers/Auth/Auth.js                                                 | component for register and login users                                                                             |
| NavigationItems          |  /src/components/Navigation/NavigationItems/NavigationItems.js                | Component for Menubar (contains NavigationItem)                                                                    |
| NavigationItem           |  /src/components/Navigation/NavigationItems/NavigationItem/NavigationItem.js  | Various links in menubar for different Routes                                                                      |
| ToolBar                  |  /src/components/Navigation/Toolbar.js                                        | Parent for NavigationItems                                                                                         |
| Question                 |  /src/components/Question/Question.js                                         | input and label for question during creating quizes [conditionally rendered according to quiz creation or viewing] |                   |
| Choices                  |  /src/components/Choices/Choices.js                                           | for 4 choices related to each question of a quiz [conditionally rendered according to quiz creation or viewing]    |
| Button                   |  /src/components/UI/Button/Button.js                                          | component for helping in UI                                                                                        |
| Input                    |  /src/components/UI/Input/Input.js                                            | component for helping in UI                                                                                        |
| Table                    |  /src/components/UI/Table/Table.js                                            | component for helping in UI                                                                                        |

## tree
to be defined