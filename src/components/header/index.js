import React,{useContext} from "react";
import "./style.scss"
import { Icon } from "@iconify/react";
import { ThemeContext } from "../../ThemeContext";
const Header = (props) => {
    const {theme} = useContext(ThemeContext);
    return (
        <>
            <div className={`navHeaderContainer ${theme}`}>
                <div className="searchBar">
                    <Icon icon="iconamoon:search-light" />
                    <input className="txtSearch" onChange={(val)=>{props.setSearch(val.target.value)}} placeholder="Search" />
                    <div className="iconCommandWrapper">
                        <Icon icon="ph:command" />
                    </div>
                </div>
                <div className="otherFeatures">
                    <div className="chatAndMore">
                        <div className="iconWrapper">
                            <Icon icon="gala:chat" height={24} />
                            <span className="lblFeature">Chat</span>
                        </div>
                        <div className="iconWrapper">
                            <Icon icon="ph:circles-four" height={24} />
                            <span className="lblFeature">More</span>
                        </div>
                    </div>
                    <div className="btnWrapper">
                        <button className="btn transparent">
                            <Icon icon="icons8:share" height={16} />
                            <span className="lblFeature" >Share</span>
                        </button>
                        <button className="btn primary">
                            <Icon icon="clarity:pencil-line" height={16}/>
                            <span className="lblFeature">Your Notes</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;