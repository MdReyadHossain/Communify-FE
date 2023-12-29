import React from "react";
import PropTypes from "prop-types";
import { MdTraffic } from "react-icons/md";
import { FaUserTie, FaUserGraduate, FaBook } from "react-icons/fa";
import { RxLinkNone2 } from "react-icons/rx";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";

export default function CardStats({
    statSubtitle,
    statTitle,
    statArrow,
    statPercent,
    statPercentColor,
    statDescripiron,
    statIconName,
    statIconColor,
}) {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                                {statSubtitle}
                            </h5>
                            <span className="font-semibold text-xl text-blueGray-700">
                                {statTitle}
                            </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                            <div
                                className={
                                    "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 rounded-full " +
                                    statIconColor
                                }
                            >
                                {statIconName == 'MdTraffic' ?
                                    <MdTraffic /> :
                                    statIconName == 'FaUserTie' ?
                                        <FaUserTie /> :
                                        statIconName == 'FaUserGraduate' ?
                                            <FaUserGraduate /> :
                                            statIconName == 'FaBook' ?
                                                <FaBook /> : <RxLinkNone2 />}
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                        <span className={statPercentColor + " mr-2"}>
                            {
                                statArrow === "up"
                                    ? <BiUpArrowAlt />
                                    : statArrow === "down"
                                        ? <BiDownArrowAlt />
                                        : ""
                            }
                            {statPercent}%
                        </span>
                        <span className="whitespace-nowrap">{statDescripiron}</span>
                    </p>
                </div>
            </div>
        </>
    );
}

CardStats.propTypes = {
    statSubtitle: PropTypes.string,
    statTitle: PropTypes.string,
    statArrow: PropTypes.oneOf(["up", "down"]),
    statPercent: PropTypes.string,
    // can be any of the text color utilities
    // from tailwindcss
    statPercentColor: PropTypes.string,
    statDescripiron: PropTypes.string,
    statIconName: PropTypes.string,
    // can be any of the background color utilities
    // from tailwindcss
    statIconColor: PropTypes.string,
};
