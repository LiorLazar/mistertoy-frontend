import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export function AccordionCmp({ onBranchSelect }) {
    return (
        <div>
            <h2>Branches:</h2>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="tlv-branch-content"
                    id="tlv-branch-header"
                    onClick={() => onBranchSelect && onBranchSelect('Tel Aviv')}
                >
                    <Typography component="span">Tel Aviv Branch</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <strong>Address:</strong> 123 Dizengoff Street, Tel Aviv<br />
                        <strong>Phone:</strong> 03-555-0123<br />
                        <strong>Hours:</strong> Sunday-Thursday: 9:00-20:00, Friday: 9:00-15:00<br />
                        <strong>Manager:</strong> Sarah Cohen<br />
                        <strong>Specialties:</strong> Educational toys, LEGO sets, Board games
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    onClick={() => onBranchSelect && onBranchSelect('Jerusalem')}
                >
                    <Typography component="span">Jerusalem Branch</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <strong>Address:</strong> 45 King George Street, Jerusalem<br />
                        <strong>Phone:</strong> 02-555-0456<br />
                        <strong>Hours:</strong> Sunday-Thursday: 9:30-19:30, Friday: 9:00-14:00<br />
                        <strong>Manager:</strong> David Levy<br />
                        <strong>Specialties:</strong> Dolls, Action figures, Puzzles, Arts & crafts
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
