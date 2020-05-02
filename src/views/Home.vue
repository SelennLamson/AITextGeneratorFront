<template>
    <v-container class='background' fluid>
        <v-row justify='center' class='page-row'>
            <v-col class='page-col' cols=8>
                <div class='page-body'
                v-bar="{preventParentScroll: true, scrollThrottle: 30}">
                    <div class='page-content'>
                        <!-- Two columns -->
                        <div style="float: left; width: 60%; padding-right: 60px; border-right: solid rgb(230, 230, 230) 1px;">

                            <!-- INTRODUCTION -->
                            <h1>AI Text Editor</h1>
                            <p>Welcome to an academic project aimed at helping authors and journalists write in a new, creative way!</p>
                            <p>Thanks to state-of-the-art developments in the world of AI, our editor lets you write your own fiction,
                            article or blog-post and automatically generate parts of it. This webservice is opened for 
                            free during a limited duration demo, but the full paper and open sources can be found in the links section.</p>
                            <p>Whether you are stuck in your creative process, or whether you want to gain some time, write a short 
                            summary of what you want to generate (or just a few keywords), select it and hit the 
                            <span style='color: white; background-color:#09a15a; padding:2px 4px; margin:2px; border-radius:4px; letter-spacing:1.25px; font-weight: 500;'>
                            GENERATE</span> button !</p>
                        </div>
                        <div style="float: left; width: 40%; padding-left: 30px;">

                            <!-- CLICK INVITATIONS -->
                            <p style="text-align: right; margin-bottom:0px;"><v-icon>mdi-arrow-top-right</v-icon></p>
                            <p style="text-align: right; margin-right:35px; line-height:30px;">Click on
                            <router-link to='/editor' style='text-decoration: none;'><span class='menu-link-sim'>EDITOR</span></router-link>
                            to begin writing some text,<br/>
                            <router-link to='/share' style='text-decoration: none;'><span class='menu-link-sim'>SHARE</span></router-link>
                             to exchange your best generations,<br/>
                            <router-link to='/feedback' style='text-decoration: none;'><span class='menu-link-sim'>FEEDBACK</span></router-link>
                             to give us your thoughts!</p>

                            <!-- POWERED BY -->
                            <h3 style="text-align: center; margin-top:50px;">
                            Powered by:
                            </h3>

                            <!-- HuggingFace -->
                            <div style="float: left; width:50%">
                                <p style="text-align: center; margin-top:10px;">
                                <a href="https://huggingface.co/" target="_blank" style="color: black; text-decoration: none;">
                                <img src="https://huggingface.co/front/assets/huggingface_logo.svg" height="64" width="64" /><br/>
                                HuggingFace <v-icon small>mdi-open-in-new</v-icon></a></p>
                            </div>

                            <!-- PyTorch -->
                            <div style="float: left; width:50%">
                                <p style="text-align: center; margin-top:10px;">
                                <a href="https://pytorch.org/" target="_blank" style="color: black; text-decoration: none;">
                                <img src="https://pytorch.org/assets/images/pytorch-logo.png" height="64" width="64" /><br/>
                                PyTorch <v-icon small>mdi-open-in-new</v-icon></a></p>
                            </div>
                        </div>

                        <!-- HOW TO USE THE EDITOR? - ENTITIES -->
                        <div style="float: left; width:100%; margin-top: 30px; margin-bottom:30px;">
                            <h2>How to use the editor?</h2>
                            <p>First, <strong>named entities</strong> are detected into the text while you type, and you can manage them yourself.
                            Selected entities will have a higher chance of being in the generated texts later so you can gain control on what's generated.</p>
                        </div>
                        
                        <div style="float: left; width:30%; text-align:center;">
                            Entities are split into four categories...<br/><br/>
                            <div style="float: left; width:23%; text-align:center; background-color: #f2f2f2; font-size:12px; padding:2px 0px; margin:2px; border-radius:4px;">
                                <v-icon>mdi-account</v-icon><br/>Persons
                            </div>
                            <div style="float: left; width:23%; text-align:center; background-color: #f2f2f2; font-size:12px; padding:2px 0px; margin:2px; border-radius:4px;">
                                <v-icon>mdi-map-marker</v-icon><br/>Locations
                            </div>
                            <div style="float: left; width:23%; text-align:center; background-color: #f2f2f2; font-size:12px; padding:2px 0px; margin:2px; border-radius:4px;">
                                <v-icon>mdi-account-group</v-icon><br/>Groups
                            </div>
                            <div style="float: left; width:23%; text-align:center; background-color: #f2f2f2; font-size:12px; padding:2px 0px; margin:2px; border-radius:4px;">
                                <v-icon>mdi-help</v-icon><br/>Other
                            </div>
                        </div>
                        <div style="float: left; width:30%; text-align:center;">
                            can be manually added...<br/><br/>
                            <span style="font-sze:12px; background-color: #f4f4f4; padding: 2px;">...he gave <span style="background-color: #aaccff">Frodo</span> the ring...</span><br/>
                            <v-icon color="#4caf50">mdi-plus-circle</v-icon>
                        </div>
                        <div style="float: left; width:20%; text-align:center;">
                            removed...<br/><br/>
                            <span style='color: #333333; background-color:#f2f2f2; padding:5px 10px; margin:2px; border-radius:2px; letter-spacing:1.25px; font-weight: 500;'>
                            GANDALF</span> <v-icon color="red">mdi-minus-circle-outline</v-icon>
                        </div>
                        <div style="float: left; width:20%; text-align:center;">
                            and selected for generation.<br/><br/>
                            <span style='color: #ffffff; background-color:#09a15a; padding:5px 10px; margin:2px; border-radius:2px; letter-spacing:1.25px; font-weight: 500;'>
                            FRODO</span><br/>
                        </div>

                        <!-- HOW TO USE THE EDITOR? - GENERATION -->
                        <div style="float: left; width:100%; margin-top: 30px; margin-bottom:20px;">
                            <p>Next, you can write a summary or a few key words and hit the generate button. The system will suggest you several text generations.
                            You can edit those, then when you are satisfied with the current one, you can validate your choice.</p>
                        </div>
                        
                        <div style="float: left; width:26%; text-align:center;">
                            Select a summary and generate:<br/>
                            <span style="font-sze:12px; background-color: #aaccff; padding: 2px;">he gave Frodo the ring</span><br/>
                            <span style='color: white; background-color:#09a15a; padding:2px 4px; margin:2px; border-radius:4px; letter-spacing:1.25px; font-weight: 500;'>
                            GENERATE</span>
                        </div>
                        <div style="float: left; width:26%; text-align:center;">
                            Selection is locked while generating:<br/>
                            <span style="font-sze:12px; background-color: rgb(255, 255, 153); padding: 2px;">he gave Frodo the ring</span>
                        </div>
                        <div style="float: left; width:28%; text-align:center;">
                            Several options are then suggested:<br/>
                            <span style="font-sze:12px; background-color: rgb(219, 255, 209); padding: 2px;">while he was climbing the mountain, he met Frodo and gave him the ring</span>
                        </div>
                        <div style="float: left; width:20%; text-align:center;">
                            Validate your choice:<br/>
                            <v-icon color="#38c56e" large>mdi-check-circle-outline</v-icon>
                        </div>

                        <!-- HOW TO USE THE EDITOR? - GENERATION SUPPLEMENT -->
                        <div style="float: left; width:100%; margin-top: 30px; margin-bottom:10px;">
                            <p>Among suggestions,
                            <span style='color: #333333; background-color:#f2f2f2; padding:5px 10px; margin:2px; border-radius:2px; letter-spacing:1.25px; font-weight: 500;'>
                            R</span> corresponds to the initial text selection and  
                            <span style='color: #333333; background-color:#f2f2f2; padding:5px 10px; margin:2px; border-radius:2px; letter-spacing:1.25px; font-weight: 500;'>
                            1</span>, <span style='color: #333333; background-color:#f2f2f2; padding:5px 10px; margin:2px; border-radius:2px; letter-spacing:1.25px; font-weight: 500;'>
                            2</span>, etc. are the generated texts. You can edit all of these suggestions before validating, it will be saved automatically.
                            Moreover, all the text written in the editor is saved automatically so you can close and open the page whenever you need to.</p>
                            <p>Finally, a size selector in the top-bar lets you choose between three paragraph sizes to generate and a genre selector lets you orient the type of text to be generated.
                            Feel free to experiment with all of these and give us feedback in the corresponding tab!</p>
                        </div>

                        <!-- DATA USAGE -->
                        <div style="float: left; width:100%; margin-top: 30px; margin-bottom:30px;">
                            <h2>How we will use your data</h2>
                            <p>
                                It is important to note that any text written in the Editor tab will be sent, analysed and saved on our server.
                                The first usage of your content is the text generation itself, and the named entities recognition. Several systems will
                                work on your content and will perform computations on them. This results in the text suggestions we offer you.
                            </p>
                            <p>
                                However, a second usage is for research purposes: we will save every request made to the server, meaning that any version
                                of your text might get registered to our server. As we don't have a user account system, we cannot guarantee the right 
                                to remove your specific data from our saved database. This second usage will solely consist in analyzing the quality of
                                the text generations: <strong>we will not publish your content on any public platform</strong>. This analysis will serve 
                                in the publication of an academic paper.
                            </p>
                            <p>
                                For any further information, please contact us through the Feedback form.
                            </p>
                        </div>
                            
                        <!-- One column -->
                        <div style="float: left; width:100%; margin-top: 10px;">

                            <!-- LINKS -->
                            <h2>Links</h2>
                            <p>Here are some usefull links to learn more about this project and run it from your computer.
                            Be warned however that it requires quite a lot of memory storage and of computational power as it
                            uses several of the biggest neural networks up to March 2020.</p>

                            <!-- Github link (backend) -->
                            <div style="float:left; width:4%; text-align:center;">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png" height="20" width="20"/>
                            </div>
                            <div style="float:left; width:96%;">
                                GitHub project (backend): <a href="https://github.com/WeazelDev/AITextGenerator" target="_blank">
                                https://github.com/WeazelDev/AITextGenerator</a> <v-icon small>mdi-open-in-new</v-icon>
                            </div>

                            <div style="float:left; width:100%; margin-top: 10px;"></div>

                            <!-- Github link (frontend) -->
                            <div style="float:left; width:4%; text-align:center;">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png" height="20" width="20"/>
                            </div>
                            <div style="float:left; width:96%;">
                                GitHub project (frontend): <a href="https://github.com/WeazelDev/AITextGeneratorFront" target="_blank">
                                https://github.com/WeazelDev/AITextGeneratorFront</a> <v-icon small>mdi-open-in-new</v-icon>
                            </div>

                            <div style="float:left; width:100%; margin-top: 10px;"></div>

                            <!-- Academic paper link -->
                            <div style="float:left; width:4%; text-align:center;"><v-icon color='black'>mdi-school</v-icon></div>
                            <div style="float:left; width:96%;">Academic paper in progress...</div>

                            <div style="float:left; width:100%; margin-top: 50px;"></div>

                            <!-- AUTHORS -->
                            <h2>Authors</h2>
                            <p>We are three Master of Science students at Centrale Supélec Paris, working on this project since a few months.
                            We hope you enjoyed using our experimental tool as much as we did while creating it!</p>

                            <!-- Alexandre Duval's link -->
                            <div style="float:left; width:4%; text-align:center;"><v-icon color='black'>mdi-account</v-icon></div>
                            <div style="float:left; width:96%;"><a href="https://www.linkedin.com/in/alexandre-duval-b00531128/" target="_blank">
                                Alexandre Duval</a> <v-icon small>mdi-open-in-new</v-icon></div>

                            <div style="float:left; width:100%; margin-top: 10px;"></div>

                            <!-- Thomas Lamson's link -->
                            <div style="float:left; width:4%; text-align:center;"><v-icon color='black'>mdi-account</v-icon></div>
                            <div style="float:left; width:96%;"><a href="http://thomas-lamson.com/" target="_blank">
                                Thomas Lamson</a> <v-icon small>mdi-open-in-new</v-icon></div>

                            <div style="float:left; width:100%; margin-top: 10px;"></div>

                            <!-- Gaël de Léséleuc's link -->
                            <div style="float:left; width:4%; text-align:center;"><v-icon color='black'>mdi-account</v-icon></div>
                            <div style="float:left; width:96%;"><a href="https://github.com/dldk-gael" target="_blank">
                                Gaël de Léséleuc</a> <v-icon small>mdi-open-in-new</v-icon></div>
                            
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import { mdiGithub } from '@mdi/js';
export default {
    
}
</script>

<style lang="scss">
@import 'home.scss';
</style>
