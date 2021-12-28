import React from 'react';
import {ScrollView, Text, View} from 'react-native';

import Header from '../components/header';
import {ScreenProps} from '../navigation';
import useStyles from '../styles/screens/terms';

const About = (props: ScreenProps<any>) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Header title="Privacy Policy" isPop />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.subtitle}>
            This privacy policy (“Policy”) explains our policy regarding the collection, use,
            disclosure and transfer of your information by Gargantua Exploration Co. Pvt Ltd and/or
            its subsidiary(ies) and/or affiliate(s) (collectively referred to as the "Company" or “G
            Player”), which operates various websites, including sub-sites, platforms, applications,
            m-web platforms and other platforms (collectively referred to as “Sites”) for delivery
            of information, products, offerings and content via any mobile or internet connected
            device or otherwise (collectively the "Services"). This Policy forms part and parcel of
            the Terms of Use and other terms on the Site (“Terms of Use”). Capitalized terms which
            have been used here but are undefined shall have the same meaning as attributed to them
            in the Terms of Use. {'\n\n'}
            This Privacy Policy is applicable to persons who access, browse or use the Services
            (“User”). For the purpose of this Policy, wherever the context so requires "you" or
            "your" shall mean User and the term "we", "us", "our" shall mean Company. {'\n\n'}
            As we update, improve and expand the Services, this Policy may change, so please refer
            back to it periodically. By accessing and using the Sites or otherwise using the
            Services, you consent to collection, storage, and use of the personal information you
            provide (including any changes thereto as provided by you) for any of the Services that
            we provide. {'\n\n'}The Company respects the privacy of the Users of the Services and is
            committed to protect it in all respects. The information about the User as collected by
            the Company is: (a) information supplied by Users and (b) information automatically
            tracked while navigation (c) information collected from any other source (collectively
            referred to as “Information”). {'\n\n'}
            <Text style={styles.title}>
              1. Information Received, Collected And Stored By The Company
            </Text>
            {'\n\n'}
            <Text style={styles.title}>A. Information Supplied by Users</Text>
            {'\n\n'} <Text style={styles.title}>Subscription or paid service data:</Text>
            {'\n\n'} When you choose any subscription or paid service provided as part of our
            Services, we or our payment gateway provider may collect your purchase, address or
            billing information, including your credit card number and expiration date etc. However,
            when you order using an in-app purchase option on any of the applications of the
            Company, the same are handled by such mobile operating system platform providers. The
            subscriptions or paid Services may be on auto renewal mode unless cancelled. If at any
            point you do not wish to auto-renew your subscription, you may cancel your subscription
            before the end of the subscription term. {'\n\n'}
            <Text style={styles.title}>Voluntary information:</Text>
            {'\n\n'} We may collect additional information at other times, including but not limited
            to, when you provide feedback, comments, change your content or email preferences,
            respond to a survey, or any communications with us.
            {'\n\n'}
            <Text style={styles.title}>
              B. Information Automatically Collected/ Tracked While Navigation
            </Text>
            {'\n\n'} <Text style={styles.title}>Cookies</Text>
            {'\n\n'} To improve the responsiveness of the Sites for our Users, we may use "cookies",
            or similar electronic tools to collect Information to assign each visitor a unique,
            random number as a User Identification (User ID) to understand the User's individual
            interests using the identified computer or device. Unless you voluntarily identify
            yourself (through registration, for example), we will have no way of knowing who you
            are, even if we assign a cookie to your computer or device. The only personal
            information a cookie can contain is information you supply. A cookie cannot read data
            off your hard drive or device. Our advertisers may also assign their own cookies to your
            browser (if you click on their ads etc.), a process that we do not control. We receive
            and store certain types of Information whenever you interact with us via Site or Service
            though your computer/laptop/netbook or mobile/tablet/pad/handheld device etc.
            {'\n\n'}
            <Text style={styles.title}>Opting out</Text>
            {'\n\n'}
            If a User opts out using the Ads Settings, the unique DoubleClick cookie ID on the
            User's browser is overwritten with the phrase "OPT_OUT". Because there is no longer a
            unique cookie ID, the opt-out cookie can't be associated with a particular browser.
            {'\n\n'}
            <Text style={styles.title}>Log File Information</Text>
            {'\n\n'}
            We automatically collect limited information about your computer's connection to the
            Internet, mobile number, including your IP address, when you visit our site, application
            or service. Your IP address is a number that lets computers attached to the Internet
            know where to send you data -- such as the pages you view. We automatically receive and
            log information from your browser, including your IP address, your computer's name, your
            operating system, browser type and version, CPU speed, and connection speed. We may also
            collect log information from your device, including your location, IP address, your
            device's name, device's serial number or unique identification number (e.g.. UDiD on
            your mobile device), your device operating system, device manufacturer/model, browser
            type (where applicable) and version, CPU speed, and connection speed etc.
            {'\n\n'}
            <Text style={styles.title}>C. Information from other Sources:</Text>
            {'\n\n'}
            We may receive information about you from other sources, add it to our account
            information and treat it in accordance with this Policy. If you provide information to
            the platform provider or other partner, whom we provide services to, your account
            information and order information may be passed on to us.
            {'\n\n'}
            <Text style={styles.title}>Demographic and other information:</Text>
            {'\n\n'} We may reference other sources of demographic and other information in order to
            provide you with more targeted communications and promotions. We use Google Analytics,
            among others, to track the user behaviour on our Sites. Google Analytics specifically
            has been enabled to support display advertising towards helping us gain understanding of
            our users' demographics and interests. The reports are anonymous and cannot be
            associated with any individual personally identifiable information that you may have
            shared with us. You can opt-out of Google Analytics for display advertising and
            customize Google Display Network ads using the Ads Settings options provided by Google.
            {'\n\n'}
            <Text style={styles.title}>2. Links to Third Party Sites / Ad-Servers</Text>
            {'\n\n'}
            The Sites may include links to other websites or applications. Such websites or
            applications are governed by their respective privacy policies, which are beyond our
            control. Once you leave our servers (you can tell where you are by checking the URL in
            the location bar on your browser), use of any information you provide is governed by the
            privacy policy of the operator of the application, you are visiting. That privacy policy
            may differ from ours. If you can't find the privacy policy of any of these sites via a
            link from the application's homepage, you should contact the application owners directly
            for more information. When we present Information to our advertisers -- to help them
            understand our audience and confirm the value of advertising on our Sites -- it is
            usually in the form of aggregated statistics on traffic to various pages / content
            within our Sites. We use third-party advertising companies to serve ads when you visit
            our Sites. These companies may use Information (excluding your name, address, email
            address or telephone number or other personally identifiable information) about your
            visits to this and other websites or application, in order to provide advertisements
            about goods and services of interest to you. We do not provide any personally
            identifiable information to third party websites / advertisers / ad-servers without your
            consent.
            {'\n\n'}
            <Text style={styles.title}>3. Information Use by The Company</Text>
            {'\n\n'}
            The information as supplied by the users enables us to improve the Services and provide
            you the most user-friendly experience. In some cases/provision of certain service(s) or
            utility(ies), we may require your contact address as well. All required Information is
            service dependent and the Company may use the above said user Information to, maintain,
            protect, and improve the Services (including advertising and personalisation on the
            Sites) and for developing new services. We may also use your email address or other
            personally identifiable information to send commercial or marketing messages about our
            Services and/or such additional updates and features about third parties products and
            services with an option to subscribe / unsubscribe (where feasible). We may, however,
            use your email address for non-marketing or administrative purposes (such as notifying
            you of major changes, for customer service purposes, billing, etc.). Any personally
            identifiable information provided by you will not be considered as sensitive if it is
            freely available and / or accessible in the public domain like any comments, messages,
            blogs, scribbles available on social platforms like Facebook, twitter etc. Any
            posted/uploaded/conveyed/communicated by users on the public sections of the Sites
            becomes published content and is not considered personally identifiable information
            subject to this Policy. In case you choose to decline to submit personally identifiable
            information on the Sites, we may not be able to provide certain services on the Sites to
            you. We will make reasonable efforts to notify you of the same at the time of opening
            your account. In any case, we will not be liable and or responsible for the denial of
            certain services to you for lack of you providing the necessary personal information.
            When you register with the Sites or Services, we contact you from time to time about
            updating of your personal information to provide the Users such features that we believe
            may benefit / interest you.
            {'\n\n'}
            <Text style={styles.title}>4. Information Sharing</Text>
            {'\n\n'} The Company shares your Information with any third party without obtaining the
            prior consent of the User in the following limited circumstances: a) When it is
            requested or required by law or by any court or governmental agency or authority to
            disclose, for the purpose of verification of identity, or for the prevention, detection,
            investigation including but not limited to cyber incidents, or for prosecution and
            punishment of offences. These disclosures are made in good faith and belief that such
            disclosure is reasonably necessary for enforcing these Terms or for complying with the
            applicable laws and regulations. b) The Company proposes to share such Information to
            conduct its business and to share such Information within its group companies and
            officers and employees of such group companies for the purpose of processing personal
            information on its behalf. We also ensure that these recipients of such Information
            agree to process such information based on our instructions and in compliance with this
            Policy and any other appropriate confidentiality and security measures. c) The Company
            may present Information to our advertisers and third parties - to help them understand
            our audience and confirm the value of advertising on our Sites – however it is usually
            in the form of aggregated statistics on traffic to various pages within our site. d) We
            may share your Information to enforce or protect our rights or any or all of its
            affiliates, associates, employees, directors or officers or when we have reason to
            believe that disclosing Information of User(s) is necessary to identify, contact or
            bring legal action against someone who may be causing interference with our rights or
            our Sites, whether intentionally or otherwise, or when anyone else could be harmed by
            such activities
            {'\n\n'}
            <Text style={styles.title}>5. Accessing and Updating Personal Information</Text>
            {'\n\n'}
            When you use the Services or Sites (or any of its sub sites), we make good faith efforts
            to provide you, as and when requested by you, with access to your personal information
            and shall further ensure that any personal information or sensitive personal data or
            information found to be inaccurate or deficient shall be corrected or amended as
            feasible, subject to any requirement for such personal information or sensitive personal
            data or information to be retained by law or for legitimate business purposes. We ask
            individual users to identify themselves and the information requested to be accessed,
            corrected or removed before processing such requests, and we may decline to process
            requests that are unreasonably repetitive or systematic, require disproportionate
            technical effort, jeopardize the privacy of others, or would be extremely impractical
            (for instance, requests concerning information residing on backup tapes), or for which
            access is not otherwise required. In any case, where we provide information access and
            correction, we perform this service free of charge, except if doing so would require a
            disproportionate effort. Because of the way we maintain certain services, after you
            delete your information, residual copies may take a period of time before they are
            deleted from our active servers and may remain in our backup systems.
            {'\n\n'}
            <Text style={styles.title}>6. Information Security</Text>
            {'\n\n'}
            We take appropriate security measures to protect against unauthorized access to or
            unauthorized alteration, disclosure or destruction of data. These include internal
            reviews of our data collection, storage and processing practices and security measures,
            including appropriate encryption and physical security measures to guard against
            unauthorized access to systems where we store personal data. All information gathered on
            TIL is securely stored within the Company controlled database. The database is stored on
            servers secured behind a firewall; access to the servers is password-protected and is
            strictly limited. However, as effective as our security measures are, no security system
            is impenetrable. We cannot guarantee the security of our database, nor can we guarantee
            that information you supply will not be intercepted while being transmitted to us over
            the Internet. And, of course, any information you include in a posting to the discussion
            areas is available to anyone with Internet access. We use third-party advertising
            companies to serve ads when you visit or use our Sites or Services. These companies may
            use information (excluding your name, address, email address or telephone number or any
            personally identifiable information) about your visits or use to particular website,
            mobile application or services, in order to provide advertisements about goods and
            services of interest to you.
            {'\n\n'}
            <Text style={styles.title}>7. Updates / Changes</Text>
            {'\n\n'} The internet is an ever evolving medium. We may alter our Policy from time to
            time to incorporate necessary changes in technology, applicable law or any other
            variant. In any case, we reserve the right to change (at any point of time) the terms of
            this Policy or the Terms of Use. Any changes we make will be effective immediately on
            notice, which we may give by posting the new policy on the Sites. Your use of the Sites
            or Services after such notice will be deemed acceptance of such changes. We may also
            make reasonable efforts to inform you via electronic mail. In any case, you are advised
            to review this Policy periodically on the Sites to ensure that you are aware of the
            latest version.
            {'\n\n'}
            <Text style={styles.title}>8. Questions / Grievance Redressal</Text>
            {'\n\n'}
            Redressal Mechanism: Any complaints, abuse or concerns with regards to the use,
            processing and disclosure of Information provided by you or breach of these terms should
            immediately be informed to the designated Grievance Officers, the list of respective
            grievance officers is being provided in Terms of Use via in writing or through email
            signed with the electronic signature to support@mxplayer.in or ("Grievance Officer")
            Kumar Tirthankar 20 Collyer Quay, #11-05, Singapore 049319 We request you to please
            provide the following information in your complaint Identification of the information
            provided by you; Clear statement as to whether the information is personal information
            or sensitive personal information; Your address, telephone number or e-mail address; A
            statement that you have a good-faith belief that the information has been processed
            incorrectly or disclosed without authorization, as the case may be; A statement, under
            penalty of perjury, that the information in the notice is accurate, and that the
            information being complained about belongs to you; You may also contact us in case you
            have any questions / suggestions about the Policy using the contact information
            mentioned above. The Company may reach out to you to confirm or discuss certain details
            about your complaint and issues raised. The Company shall not be responsible for any
            communication, if addressed, to any non-designated person in this regard.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
