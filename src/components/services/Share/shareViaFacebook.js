import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Container, Segment } from "semantic-ui-react";
import { useLocation } from "react-router";
import "./shareViaFacebook.css"

function Share() {
  const location = useLocation();
  let path = `https://ed3amny.herokuapp.com${location.pathname}`;

  return (
    <>
      <Container>
        <div className="ShareButtonsParent">
          <div>
            <Segment>
              <FacebookShareButton
                url={path}
                quote={"Easy Peasy Lemon Squeezy"}
                hashtag="#facebookshare"
              >
                <FacebookIcon logofillcolor="white" ></FacebookIcon>
              </FacebookShareButton>
            </Segment><p>Facebook</p>
          </div>

          <div>
            <Segment>
              <LinkedinShareButton
                url={path}
                title="Hello"
                summary="Hello"
                source="Ed3amny"
              >
                <LinkedinIcon></LinkedinIcon>
              </LinkedinShareButton>
            </Segment><p>Linkedin</p>
          </div>

          <div>
            <Segment>
              <TwitterShareButton
                url={path}
                title={"hello"}
                /*
          title (string): Title of the shared page
          via: (string)
          hashtags (array): Hashtags
          related (array): Accounts to recommend following
          */
              >
                <TwitterIcon></TwitterIcon>
              </TwitterShareButton>
            </Segment><p>Twitter</p>
          </div>

<div>
<Segment>
          <WhatsappShareButton
            title="hello"
            url={path}
            // separator (string, default=" "): Separates title from the url
          >
            <WhatsappIcon></WhatsappIcon>
          </WhatsappShareButton>
        </Segment> <p>Whatssapp</p>

</div>



        </div>
      </Container>
    </>
  );
}

export default Share;

{
  /* <Segment>
          <RedditShareButton title={path}>
            <RedditIcon></RedditIcon>
          </RedditShareButton>
        </Segment> */
}

{
  
}
